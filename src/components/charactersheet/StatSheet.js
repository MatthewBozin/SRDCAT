import React from "react";
import Stats from "./Stats.js";
import Attributes from "./Attributes.js";
import Defenses from "./Defenses.js";
import Resources from "./Resources.js";

const StatSheet = () => {
  return (
    <div>
      <Attributes />
      <Defenses />
      <Resources />
      <Stats stats={["level", "PRO", "MCOST"]} name={"STATS"} />
    </div>
  );
};

export default StatSheet;
