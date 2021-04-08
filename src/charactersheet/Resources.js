import React from "react";
import Stat from "./Stat";

const Resources = () => {
  return (
    <div className="item">
      <div className="row entry">RESOURCES</div>
      <div className="bit row entry">
        <button className="bit bordered padded2 margin">
          <Stat className="bit bordered padded2 margin" stat={"LIFE"} />
        </button>
        <button className="bit bordered padded2 margin">
          <Stat className="bit bordered padded2 margin" stat={"MCOST"} />
        </button>
        <button className="bit bordered padded2 margin">
          <Stat className="bit bordered padded2 margin" stat={"HERODICE"} />
        </button>
        <button className="bit bordered padded2 margin">
          <Stat className="bit bordered padded2 margin" stat={"XP"} />
        </button>
      </div>
    </div>
  );
};

export default Resources;
