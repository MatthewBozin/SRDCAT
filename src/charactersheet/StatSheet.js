import React from "react";
import Stats from "./Stats.js";
import Defenses from "./Defenses.js";
import Resources from "./Resources.js";

const StatSheet = () => {
  return (
    <div className="bit">
      <Stats />
      <Defenses />
      <Resources />
    </div>
  );
};

export default StatSheet;
