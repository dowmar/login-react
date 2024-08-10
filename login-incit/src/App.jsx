import Register from "./components/Register"
import './App.css'
import Login from "./components/Login"
import Layout from "./components/Layout"
import Home from "./components/Home"
import Admin from "./components/Admin"
import Missing from "./components/Missing"
import RequireAuth from "./components/RequireAuth"
import { Routes, Route } from "react-router-dom"
import LinkPage from "./components/LinkPage"
import Unauthorized from "./components/Unauthorized"
import PersistLogin from "./components/PersistLogin"
import VerifyEmail from "./components/VerifyEmail"
import Profile from "./components/Profile"

// const ROLES = {
//   'User': 2001,
//   'Editor': 1984,
//   'Admin': 5150
// }

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["user"]} />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="admin" element={<Admin />} />
            <Route path="lounge" element={<Admin />} />
          </Route>
        </Route>

        {/* catch */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>

  )
}

export default App
