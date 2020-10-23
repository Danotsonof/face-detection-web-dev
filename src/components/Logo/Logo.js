import React from "react";
import Tilt from "react-tilt";
import './Logo.css'
import face from './face.png'

const Logo = ({ onRouteChange, navItem, setNavItem }) => {
  const href = {
    'Register': 'reg',
    'Sign Out': 'signin',
    'Sign In': 'signin',
  }
  const nav = {
    'Register': 'Sign In',
    'Sign Out': 'Register',
    'Sign In': 'Register',
  }

  return (
    <nav className="">
      <div className="pa2">
        <Tilt
          className="Tilt br2 shadow-2"
          options={{ max: 50 }}
        >
          <div className="Tilt-inner"> <img className='Logo' src={face} alt="face logo" /></div>
        </Tilt>
      </div>
    
        <div className="pa2">
          <p className="f6 link pointer fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba"
            onClick={() => { onRouteChange(href[navItem]); setNavItem(nav[navItem]) }} >
            {navItem}
          </p>
        </div>
     
    </nav>
  );
};

export default Logo;
