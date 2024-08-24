import React from "react";

const AreaOfInterestSelector = ({ areas, onSelectArea }) => {
  return (
    <div>
      <h2>Select Area of Interest</h2>
      <ul>
        {areas.map((area) => (
          <li key={area.value} onClick={() => onSelectArea(area.value)}>
            {area.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AreaOfInterestSelector;
