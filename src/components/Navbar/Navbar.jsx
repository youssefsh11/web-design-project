import React, { useContext, useState } from 'react'
import  './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ onSearch = () => {}}) => {

  const [menu,setMenu] = useState("home");
  const [search,setSearch] = useState("");
  const {getTotalCartAmount} = useContext(StoreContext);
  const navigate = useNavigate();

  const triggerSearch = () => {
    onSearch(search);
  }

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    onSearch(value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      triggerSearch();
    }
  }

  return (
    <div className='navbar'>
      <Link to='/restaurant'><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to="/restaurant" onClick={()=>setMenu("home")} className={`${menu==="home"?"active":""}`}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={`${menu==="menu"?"active":""}`}>menu</a>
        <a href='#app-download' onClick={()=>setMenu("mob-app")} className={`${menu==="mob-app"?"active":""}`}>mobile app</a>
        <a href='#footer' onClick={()=>setMenu("contact")} className={`${menu==="contact"?"active":""}`}>contact us</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            aria-label="Search menu items"
          />
          <button type="button" onClick={triggerSearch} aria-label="Submit search">
            <img src={assets.search_icon} alt="" />
          </button>
        </div>
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount()>0?"dot":""}></div>
        </Link>
        <button onClick={()=>navigate('/login')}>sign in</button>
      </div>
    </div>
  )
}

export default Navbar
