import React, { useState } from 'react';
import AhmedabadGandhinagarPoints from "../Data.js";
import fullMap from '../assets/MapImage.jpg';
import Box from '@mui/material/Box';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox
} from '@mui/material';

const Map = () => {
  const [hoverData, setHoverData] = useState({ population: null, x: 0, y: 0 });
  const [filterCategories, setFilterCategories] = useState([]); 

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const isInFilter = (population) => {
    const pop = parseInt(population);
    return filterCategories.some((category) => {
      if (category === 'below10') return pop < 10000000;
      if (category === 'between10and50') return pop >= 10000000 && pop <= 50000000;
      if (category === 'between50and100') return pop >= 50000000 && pop <= 100000000;
      if (category === 'above100') return pop > 100000000;
      return false;
    });
  };

  return (
    <div>
      <Box sx={{ maxWidth: '1000px', margin: '20px auto' }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Filter by Population</FormLabel>
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
            {[
              { label: "Below 10 Million", value: "below10" },
              { label: "10–50 Million", value: "between10and50" },
              { label: "50–100 Million", value: "between50and100" },
              { label: "Above 100 Million", value: "above100" },
            ].map((item) => (
              <FormControlLabel
                key={item.value}
                control={
                  <Checkbox
                    checked={filterCategories.includes(item.value)}
                    onChange={handleFilterChange}
                    value={item.value}
                  />
                }
                label={item.label}
              />
            ))}
          </Box>
        </FormControl>
      </Box>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          margin: 'auto',
        }}
        className="main-container"
      >
        <Box className="image-map-container">
          <Box
            component={"img"}
            src={fullMap}
            alt="Image Map"
            className="image-map"
            sx={{
              width: '100%',
              display: 'block',
            }}
          />

          {hoverData.population && (
            <Box
              sx={{
                position: 'absolute',
                top: hoverData.y,
                left: hoverData.x,
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '4px 8px',
                fontSize: '12px',
                borderRadius: '4px',
                pointerEvents: 'none',
                transform: 'translate(10px, 10px)',
                zIndex: 10
              }}
            >
              Population: {(parseInt(hoverData.population) / 1000000).toFixed(2)} Million
            </Box>
          )}

          <svg
            className="svg-overlay"
            viewBox="0 0 2080 2080"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            {AhmedabadGandhinagarPoints.map((el) => {
              const matchFilter = isInFilter(el.population);
              return (
                <g key={el.id}>
                  <polygon
                    points={el?.points}
                    title={el.title}
                    style={{
                      fill: matchFilter ? "rgba(0, 128, 0, 0.5)" : el?.color || "rgba(223, 28, 30, 0.5)",
                      stroke: matchFilter ? "#008000" : "#5e2e2eff",
                      strokeWidth: el.scalePass ? 1 : 2,
                      opacity: 1,
                      cursor: 'pointer',
                      pointerEvents: 'all'
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                      setHoverData({
                        population: el.population,
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                      });
                    }}
                    onMouseLeave={() => {
                      setHoverData({ population: null, x: 0, y: 0 });
                    }}
                    onClick={() => {
                      navigate(el.path);
                    }}
                  />
                  {el.centeredPoint && (
                    <text
                      x={el.centeredPoint.split(",")[0]}
                      y={el.centeredPoint.split(",")[1]}
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {el.title}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </Box>
      </Box>
    </div>
  );
};

export default Map;
