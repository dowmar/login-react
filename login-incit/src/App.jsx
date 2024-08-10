import Register from "./components/Register"
import './App.css'
import Login from "./components/Login"
import Layout from "./components/Layout"
import Missing from "./components/Missing"
import RequireAuth from "./components/RequireAuth"
import { Routes, Route } from "react-router-dom"
import Unauthorized from "./components/Unauthorized"
import PersistLogin from "./components/PersistLogin"
import VerifyEmail from "./components/VerifyEmail"
import Profile from "./components/Profile"
import ChangePassword from "./components/ChangePassword"
import Dashboard from "./components/Dashboard"
import ResendEmail from "./components/ResendEmail"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={
          <Login />
        } />
        <Route path="register" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="resend-email" element={<ResendEmail />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["user"]} />}>
            <Route path="/" element={
              <Dashboard />
            } />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* catch */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes >

  )
}

export default App
