import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./navInterface.css";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

function NavInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const hamburgerRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/inventory-search">Inventory Search</NavLink></li>
          <li><NavLink to="/low-stock-alerts">Low Stock Alerts</NavLink></li>
        </ul>

        <div className="navbar-action">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>

        <div className="navbar-hamburger" onClick={toggleMenu} ref={hamburgerRef}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-mobile-menu ${isOpen ? 'active' : ''}`} ref={menuRef}>
          <li><NavLink to="/profile" onClick={closeMenu}>Profile</NavLink></li>
          <li><NavLink to="/inventory-search" onClick={closeMenu}>Inventory Search</NavLink></li>
          <li><NavLink to="/low-stock-alerts" onClick={closeMenu}>Low Stock Alerts</NavLink></li>
          <li>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavInterface;