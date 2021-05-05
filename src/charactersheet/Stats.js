import React from "react";
import Stat from "./Stat";

const Resources = () => {
  return (
    <div className="item">
      <div className="row entry">STATS</div>
      <div className="bit row entry">
        <button className="bit button bordered padded2">
          <Stat className="bit bordered padded2 margin" stat={"LEVEL"} />
        </button>
        <button className="bit button bordered padded2">
          <Stat className="bit bordered padded2 margin" stat={"PRO"} />
        </button>
        <button className="bit button bordered padded2">
          <Stat className="bit bordered padded2 margin" stat={"MCOST"} />
        </button>
      </div>
    </div>
  );
};

export default Resources;
