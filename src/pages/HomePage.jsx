import Signup from "../components/Signup";
import Login from "../components/Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false)

  if(window.location.pathname === "/login" && !isChecked) {
    setIsChecked(true)
  } 

  const handleInputChange = (e) => {
    setIsChecked(e.target.checked)
    navigate(e.target.checked ? "/login": "/signup")
  }
  
  return (
    <div className="main">
      <input type="checkbox" onChange={handleInputChange} checked={isChecked} id="chk"  />
      <Signup />
      <Login />
    </div>
  );
}
