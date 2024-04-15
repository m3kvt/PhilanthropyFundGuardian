import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown, FaArrowDown, FaBars, FaDropbox, FaSearch } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(
    localStorage.getItem("name") || null
  );
  console.log("donation name:", userName);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   // Handle search functionality here, for example, redirect to search results page
  //   console.log("Search query:", searchQuery);
  // };
  const handleLogout = () => {
    localStorage.removeItem("name");
    setUserName(null);
    setShowLogout(false);
  };


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to={`/${name}`}>
            <img src={logo} alt="Logo" width="90px" />
          </Link>
        </div>
        <div className="nav-icon" onClick={toggleNavbar}>
          <FaBars />
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to={`/${name}`} className="nav-links" onClick={toggleNavbar}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={toggleNavbar}>
              About us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={toggleNavbar}>
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/apply" className="nav-links" onClick={toggleNavbar}>
              Funds
            </Link>
          </li>
          <li className="nav-item">
          <Link to="/applicationstatus" className="nav-links" onClick={toggleNavbar}>
              Application Status
            </Link>
          </li>
        </ul>
        {/* <div className="searchbox">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="  search..."
              className="search-bar"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-btn">
              <FaSearch />
            </button>
          </form>
        </div> */}
        <div className="nav-btn">
          {userName ? (
            <div className="nav-btn-link">
            <Link to={`/profile/${userName}`} style={{color:"#fff", textDecoration: 'none'}} >
              {userName}
            </Link>
            <FaAngleDown onClick={() => setShowLogout(!showLogout)}/>
            {showLogout && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              )}

            </div>
            
          ) : (
            <>
              <Link to="/signin" className="nav-btn-link">
                Sign In
              </Link>
              <Link to="/adminlogin" className="nav-btn-link">
                Admin
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from 'react'
// import {Nav,NavbarContainer,NavLogo,MobileIcon,NavMenu,NavItem,NavLinks,NavBtn,NavBtnLink} from './NavbarElements'
// import {FaBars} from 'react-icons/fa'
// import logo from "/src/assets/logo.png"

// const Navbar = () => {

//   return (
//     <>
//         <Nav>
//             <NavbarContainer>
//                 <NavLogo to='/'>
//                 <img src={logo} alt="Logo" width='90px'/>

//                 </NavLogo>
//                 <MobileIcon>
//                     <FaBars/>
//                 </MobileIcon>
//                 <NavMenu>
//                     <NavItem>
//                         <NavLinks to='home' >Home</NavLinks>
//                     </NavItem>
//                     <NavItem>
//                         <NavLinks to='about' >About</NavLinks>
//                     </NavItem>
//                     <NavItem>
//                         <NavLinks to='contact' >Contact Us</NavLinks>
//                     </NavItem>
//                     <NavItem>
//                         <NavLinks to='about'>About Us</NavLinks>
//                     </NavItem>

//                 </NavMenu>
//                 <NavBtn>
//                     <NavBtnLink to='signin'>Sign In</NavBtnLink>
//                     <NavBtnLink to='signin'>Admin</NavBtnLink>
//                 </NavBtn>
//                 {/* <NavBtn>

//                 </NavBtn> */}
//             </NavbarContainer>
//         </Nav>
//     </>
//   )
// }

// export default Navbar
