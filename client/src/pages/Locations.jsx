import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocationsAPI from '../services/LocationsAPI';
import unitygrid from '../assets/unitygrid.jpg';
import '../css/Locations.css';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [hoveredVenue, setHoveredVenue] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsData = await LocationsAPI.getAllLocations();
        setLocations(locationsData);
        console.log(locationsData);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  if (locations.length === 0) {
    return <div>Loading locations...</div>;
  }

  return (
    <div className='available-locations'>
      {locations.map((location, index) => (
        <div
          key={location.id}
          id={`venue${index + 1}button`}
          className={`venue${index + 1}-button-overlay`}
          style={{ opacity: hoveredVenue === `venue${index + 1}` ? 1 : 0 }}
        >
          <button>{location.name}</button>
        </div>
      ))}

      <svg
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        x='0px'
        y='0px'
        viewBox='0 0 1000.32 500'
        xmlSpace='preserve'
      >
        <image
          id='background'
          xlinkHref={unitygrid}
          transform='matrix(0.48 0 0 0.48 0 0)'
        ></image>

        <Link to={`/${locations[0]?.id}`}>
          <polygon
            id='venue1'
            points='2.97,234.52 17.94,198.9 34.45,188.58 52.52,191.68 56.65,196.32 69.03,162.26 84,137.48 
            103.61,121.48 126.32,109.61 154.71,125.61 175.87,149.87 189.81,176.71 199.61,206.13 205.81,229.35 210.45,243.81 206.84,272.19 
            214.58,285.1 214.58,302.13 203.74,334.13 194.45,351.68 205.29,366.65 132.52,366.65 159.35,391.42 155.74,399.68 119.61,399.68 
            86.06,399.68 62.84,399.68 25.16,399.68 0,397.61 '  
            onMouseOver={() => setHoveredVenue('venue1')}
            onMouseOut={() => setHoveredVenue(null)}
          />
        </Link>

        <Link to={`/${locations[1]?.id}`}>
          <polygon
            id='venue2'
            points='358.58,353.74 376.65,322.77 389.55,314.52 384.39,280.45 407.61,272.19 422.06,220.58 
            438.58,126.65 449.42,38.39 457.68,16.71 468,35.81 474.19,103.42 491.74,203.03 508.26,261.87 517.03,281.48 517.03,214.9 
            529.42,194.26 540.77,197.35 540.77,169.48 552.13,167.94 556.77,149.87 566.06,156.06 566.06,193.74 577.42,211.81 577.42,238.65 
            601.16,254.65 594.45,302.13 575.87,335.68 587.23,353.74 601.16,363.55 358.58,363.55 '  
            onMouseOver={() => setHoveredVenue('venue2')}
            onMouseOut={() => setHoveredVenue(null)}
          />
        </Link>

        <Link to={`/${locations[2]?.id}`}>
          <polygon
            id='venue3'
            points='998.06,83.81 952.65,31.16 914.45,16.71 877.29,43.55 833.94,102.39 811.74,161.23 
            796.77,241.23 802.97,303.16 833.94,353.23 871.61,385.23 954.71,385.23 1000.32,387.81 '  
            onMouseOver={() => setHoveredVenue('venue3')}
            onMouseOut={() => setHoveredVenue(null)}
          />
        </Link>

        <Link to={`/${locations[3]?.id}`}>
          <polygon
            id='venue4'
            points='625,291 615,305 608,318 625,338 637,354 622.5,358 673,363.5 751,363.5 793,363.5 
            769,352 772,347 793,340 806,321 796.8,291 784,269 757,261 730,272 707,281 672,283 '  
            onMouseOver={() => setHoveredVenue('venue4')}
            onMouseOut={() => setHoveredVenue(null)}
          />
        </Link>
      </svg>
    </div>
  );
};

export default Locations;