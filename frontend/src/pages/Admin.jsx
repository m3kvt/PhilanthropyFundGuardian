import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "/src/styles/Admin.css"
import { FaUser, FaUserCircle } from 'react-icons/fa';
const Admin = () => {

  const username=localStorage.getItem("adminusername");
  
  return (
    <div className="admin-container" id="admin">
        <h1 style={{textAlign:"center", color: "#00715d",fontStyle:"italic",textDecoration:"underline"}}><FaUser/> {username}</h1><br/>
        <div className='admin-checks'>
        <h4 style={{color: "#4CAF50"}}>DONOR DETAILS : <Link to={`/display/donor/$causeId`} >Click here</Link></h4>
        <h4 style={{color: "#4CAF50"}}>APPLICANTS : <Link to={`/display/apply/$causeId`}>Click Here</Link></h4>
        <h4 style={{color: "#4CAF50"}}>Total Cause Amount : <Link to={`/display/cause/$causeId`}>Click Here</Link></h4>
        </div>
    </div>
  )
}

export default Admin