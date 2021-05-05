import React from "react";
import Stats from "./Stats.js";
import Attributes from "./Attributes.js";
import Defenses from "./Defenses.js";
import Resources from "./Resources.js";

const StatSheet = () => {
  return (
    <div className="bit">
      <Attributes />
      <Defenses />
      <Resources />
      <Stats />
    </div>
  );
};

export default StatSheet;
