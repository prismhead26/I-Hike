import React from "react";

const TrailsList = ({ trails }) => {
  return (
    <div>
      {trails.map((trail) => (
        <div key={trail.id}>
          <h3>{trail.name}</h3>
          <p>{trail.description}</p>
          {/* Add more trail details here */}
        </div>
      ))}
    </div>
  );
};

export default TrailsList;
