import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPwdVisible, setIsPwdVisible] = useState();
  const [type, setType] = useState('password');


  const handleClickPasswordVisible = (e) => {
    e.preventDefault();
    if (type === "password") {
      setType("text");
      setIsPwdVisible(true);
    } else {
      setType("password");
      setIsPwdVisible(false);
    }
  };

  const getIcon = () => {
    return isPwdVisible ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {  email, password, name, profile, isActive: false  }
    const userList = JSON.parse(localStorage.getItem('userList') || "[]")
    for(let oldUser of userList) {
      if(oldUser.email === user.email) {
        alert("email already exist")
        return false
      }
    }
    userList.push(user)
    localStorage.setItem('userList', JSON.stringify( userList))
    window.location.pathname = "/login"
  }

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <label htmlFor="chk" aria-hidden="true">
          Sign up
        </label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} name="name" placeholder="Name" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" placeholder="Email" required/>
        <div style={{ position: "relative" }}>
          <input
            type={type}
            value={password} onChange={e => setPassword(e.target.value)} name="password"
            placeholder="Password"
            required
          />
          <button className="icon" onClick={handleClickPasswordVisible}>
            <i className={getIcon()}></i>
          </button>
        </div>
        <input type="file" accept="image/*" onChange={e => setProfile(e.target.files[0])} name="profile" placeholder="Profile"/>
        <button type="submit" className="btn">Sign up</button>
      </form>
    </div>
  );
}
