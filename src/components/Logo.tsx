import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link 
      to="/"
      className="animate-slide-down opacity-0"
      style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
    >
      <img 
        src="openvaartha-logo.jpg" 
        alt="OpenVaartha Logo" 
        className="h-20 w-20" 
      />
    </Link>
  );
};

export default Logo;
