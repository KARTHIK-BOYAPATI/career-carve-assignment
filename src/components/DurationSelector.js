import React from "react";

const DurationSelector = ({ durations, onSelectDuration }) => {
  return (
    <div>
      <h2>Select Duration</h2>
      <ul>
        {durations.map((duration) => (
          <li key={duration.label} onClick={() => onSelectDuration(duration)}>
            {duration.label} - ₹{duration.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DurationSelector;
