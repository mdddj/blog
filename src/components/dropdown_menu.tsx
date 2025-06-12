import React, { useState } from 'react';
import { NavLink } from '@@/exports';

interface DropdownMenuProps {
  items: { label: string; to: string }[];
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 p-0">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {children}
          </label>
          {isOpen && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {items.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => isActive ? 'active' : ''}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {items.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;