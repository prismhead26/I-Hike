import React from "react";

const TrailsList = ({ trails }) => {
  return (
    <div>
      {trails.map((trail) => (
        <div key={trail.placeId}>
          <h3>{trail.name}</h3>
          {/* Add more trail details here */}
        </div>
      ))}
    </div>
  );
};

export default TrailsList;
