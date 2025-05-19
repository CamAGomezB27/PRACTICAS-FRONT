import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login/LoginPage"
import DashAdmin from "./pages/Dashboard/Admin/DashboardAdministrador"

const App: React.FC = () =>{
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/dashboar-administrador" element={<DashAdmin/>}/>
      </Routes>
    </Router>
  )
}

export default App
