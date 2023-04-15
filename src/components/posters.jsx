import React, { useState, useEffect } from 'react';
import "../components-css/posters.css";

import poster1 from '../img/poster.png';
import poster2 from '../img/poster2.png';
import poster3 from '../img/poster3.png';
import poster4 from '../img/poster4.png';

const Posters = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    poster1,
    poster2,
    poster3,
    poster4,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="posters">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
    </div>
  );
};

export default Posters;