import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {

   const navigate = useNavigate()
   const [user, setUser] = useState()

    if(!localStorage.getItem("myActiveUser")) {
        navigate("/login")
    } 

    useEffect(()=>{
       const user = JSON.parse(localStorage.getItem("myActiveUser") || "{}")
       if(!user.email) navigate("/login")
       setUser(user)
    }, [])
    
    const handleLogOut = () => {
        localStorage.removeItem("myActiveUser")
        navigate("/login")
    }
  return (
    <div className="main">
      <div className="dashboard">
        <div className="profile-container">
        <div className="profile">
            {user && <div> 
                Welcome, {user.name || user.email}
                </div>}
        </div>
        <button className="btn" onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </div>
  )
}
