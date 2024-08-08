import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Foods = () => {
  const [foods, setFoods] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/foods", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setFoods(response.data);
      } catch (error) {
        console.error(error);
        navigate('/login', { state: { from: location }, replace: true })
      }
    };

    getUsers();
    return () => {
      isMounted = false;
      controller.abort;
    };
  }, []);
  return (
    <article>
      <h2>Food List</h2>
      {foods?.length ? (
        <ul>
          {foods.map((food, i) => (
            <li key={i}>{food?.name}</li>
          ))}
        </ul>
      ) : (
        <p> no user to display</p>
      )}
      {/* <button onClick={() => refresh()}>refresh</button>
      <br /> */}
    </article>
  );
};

export default Foods;
