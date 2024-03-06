import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [eye, setEye] = useState("fa-solid fa-eye")


  const handleClickPasswordVisible = (e) => {
    e.preventDefault();
    if (type === "password") {
      setType("text");
      setEye("fa-solid fa-eye-slash")
    } else {
      setType("password");
      setEye("fa-solid fa-eye")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userList = JSON.parse(localStorage.getItem('userList') || "[]")
    let isLoggedIn = false;
    let newUserList = []
    let activeUser = null
    for(let user of userList) {
      if(user.email=== email && user.password=== password) {
        user.isActive= true
        isLoggedIn = true;
        activeUser = user;
      }
      newUserList.push(user)
    }
    if(!isLoggedIn || !activeUser) return false;
    localStorage.setItem("myActiveUser", JSON.stringify(activeUser))
    localStorage.setItem('userList', JSON.stringify(newUserList))
    navigate("/dashboard")
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="chk" aria-hidden="true">
          Login
        </label>
        <input type="email" name="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
        <div style={{ position: "relative" }}>
          <input
            type={type}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            required
          />
          <button className="icon" onClick={handleClickPasswordVisible}>
            <div className={eye}></div>
          </button>
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}
