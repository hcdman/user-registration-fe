import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import { AuthProvider } from "./context/AuthContext"
import { ThemeContextProvider } from "./context/ThemeContext"

function App() {

  return (
    <AuthProvider>
      <ThemeContextProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </ThemeContextProvider>
    </AuthProvider>
  )
}

export default App
