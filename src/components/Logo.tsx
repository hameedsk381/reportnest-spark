import { Link } from "react-router-dom"
import logo from '/logo.png'; // Adjust the path as needed

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2  text-2xl font-bold font-serif">
      <img 
        src={logo} 
        alt="Open vaartha logo" 
        className="w-[5rem]"
      />
      {/* <span>OpenVaartha</span> */}
    </Link>
  )
}