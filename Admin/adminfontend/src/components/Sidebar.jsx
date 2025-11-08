import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)

  // Nếu chưa login admin thì không hiển thị sidebar
  if (!aToken) return null

  return (
    <div className="min-h-screen bg-white border-r shadow-sm">
      <ul className="text-[#515151] mt-5">
        {/* Dashboard */}
        <li>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-8 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/admin-dashboard'}
          >
            <img src={assets.home_icon} alt="Dashboard" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
        </li>

        {/* Product Management */}
        <li>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-8 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/admin-products'}
          >
            <img src={assets.box_icon} alt="Products" />
            <p className="hidden md:block">Products</p>
          </NavLink>
        </li>

        {/* Orders Management */}
        <li>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-8 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/admin-orders'}
          >
            <img src={assets.order_icon} alt="Orders" />
            <p className="hidden md:block">Orders</p>
          </NavLink>
        </li>

        {/* User List */}
        <li>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-8 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/admin-users'}
          >
            <img src={assets.user_icon} alt="Users" />
            <p className="hidden md:block">Users</p>
          </NavLink>
        </li>

        {/* Settings or Logout */}
        <li>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-8 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/admin-settings'}
          >
            <img src={assets.settings_icon} alt="Settings" />
            <p className="hidden md:block">Settings</p>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
