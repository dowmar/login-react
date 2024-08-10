import { getAllUser } from "../models/register.js";
import { getAllLoggings } from "../services/registerService.js";
import { startOfDay, endOfDay, subDays } from "date-fns";

export const getUserLog = async (req, res) => {
  try {
    const logging = await getAllLoggings();
    const users = await getAllUser();

    const combinedData = users.map((user) => {
      const userSessions = logging.filter(
        (logging) => logging.email === user.email
      );

      return {
        email: user.email,
        signUpTimestamp: user.created_time,
        loginCount: userSessions.filter((session) => session.status === "login")
          .length,
        lastLogout: userSessions
          .filter((session) => session.status === "logout")
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
          ?.created_at,
      };
    });

    res.json(combinedData);
  } catch (error) {
    res.sendStatus(400);
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const logging = await getAllLoggings(); // Get all session logs
    const users = await getAllUser(); // Get all users

    // 1. Total number of users who have signed up
    const totalUsers = users.length;

    // 2. Total number of users with active sessions today
    const today = new Date();
    const activeSessionsToday = logging.filter((session) => {
      const sessionDate = new Date(session.created_at);
      return (
        session.status === "login" &&
        sessionDate >= startOfDay(today) &&
        sessionDate <= endOfDay(today) &&
        !logging.some(
          (log) =>
            log.email === session.email &&
            log.status === "logout" &&
            new Date(log.created_at) > sessionDate
        )
      );
    }).length;

    // 3. Average number of active session users in the last 7 days rolling
    let activeSessionCounts = [];
    for (let i = 0; i < 7; i++) {
      const day = subDays(today, i);
      const activeSessions = logging.filter((session) => {
        const sessionDate = new Date(session.created_at);
        return (
          session.status === "login" &&
          sessionDate >= startOfDay(day) &&
          sessionDate <= endOfDay(day) &&
          !logging.some(
            (log) =>
              log.email === session.email &&
              log.status === "logout" &&
              new Date(log.created_at) > sessionDate
          )
        );
      }).length;
      activeSessionCounts.push(activeSessions);
    }
    const avgActiveSessions7Days = (
      activeSessionCounts.reduce((acc, val) => acc + val, 0) / 7
    ).toFixed(2);

    // Send the response
    res.json({
      totalUsers,
      activeSessionsToday,
      avgActiveSessions7Days,
    });
  } catch (error) {
    res.sendStatus(400);
  }
};
