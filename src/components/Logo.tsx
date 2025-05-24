
import React from 'react';
import { Link } from "react-router-dom"
import logo from '/logo.png';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-serif">
      <img 
        src={logo} 
        alt="Open vaartha logo" 
        className={`w-[5rem] ${className}`}
      />
    </Link>
  )
}

// Also export as default for compatibility
export default Logo;
