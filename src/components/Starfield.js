import React, { useEffect, useState } from 'react';

const Starfield = ({ starCount = 100 }) => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      
      for (let i = 0; i < starCount; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          animationDuration: Math.random() * 3 + 2,
          animationDelay: Math.random() * 2,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
      
      setStars(starArray);
    };
    
    generateStars();
  }, [starCount]);
  
  return (
    <div className="global-starfield">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
            opacity: star.opacity
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;