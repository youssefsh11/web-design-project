import React from 'react'
import { NavLink } from 'react-router-dom'
import './DashboardNav.css'

const DashboardNav = () => {
  return (
    <div className='dashboard-nav'>
      <NavLink
        to='/'
        end
        className={({ isActive }) =>
          isActive ? 'dashboard-nav-link active' : 'dashboard-nav-link'
        }
      >
        Donations
      </NavLink>
      <NavLink
        to='/restaurant'
        className={({ isActive }) =>
          isActive ? 'dashboard-nav-link active' : 'dashboard-nav-link'
        }
      >
        Order Food
      </NavLink>
      <NavLink
        to='/favorites'
        className={({ isActive }) =>
          isActive ? 'dashboard-nav-link active' : 'dashboard-nav-link'
        }
      >
        Favourites
      </NavLink>
      <NavLink
        to='/myorder'
        className={({ isActive }) =>
          isActive ? 'dashboard-nav-link active' : 'dashboard-nav-link'
        }
      >
        My Orders
      </NavLink>
    </div>
  )
}

export default DashboardNav



