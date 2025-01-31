import { useEffect, useState } from "react";
import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/Signup"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    console.log("Logged user >>", loggedUser);
    setLoggedInUser(loggedUser);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loggedInUser ? <Home></Home> : <Navigate to={"/login"}></Navigate>}></Route>
        <Route path="/login" element={loggedInUser ? <Navigate to={"/"}></Navigate> : <Login></Login>}></Route>
        <Route path="/signup" element={loggedInUser ? <Navigate to={"/"}></Navigate> : <SignUp></SignUp>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App