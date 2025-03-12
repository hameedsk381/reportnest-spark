import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import FuzzyText from "@/FuzzyText/FuzzyText";

const NotFound = () => {
  const location = useLocation();
  const [hoverIntensity] = useState(0.5);
  const [enableHover] = useState(true);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          <FuzzyText 
            baseIntensity={0.2} 
            hoverIntensity={hoverIntensity} 
            enableHover={enableHover}
          >
            404
          </FuzzyText>
        </h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
