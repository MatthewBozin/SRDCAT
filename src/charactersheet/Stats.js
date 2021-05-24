import React from "react";
import Stat from "./Stat";

const Resources = () => {
  return (
    <div className="outerbox">
      <div className="row mleft5px">STATS</div>
      <div className="padded5px row mleft5px">
        <button className="button bordered padded5px margin5px">
          <Stat
            className="bordered padded5px margin5px mright15px"
            stat={"LEVEL"}
          />
        </button>
        <button className="button bordered padded5px margin5px">
          <Stat
            className="bordered padded5px margin5px mright15px"
            stat={"PRO"}
          />
        </button>
        <button className="button bordered padded5px margin5px">
          <Stat
            className="bordered padded5px margin5px mright15px"
            stat={"MCOST"}
          />
        </button>
      </div>
    </div>
  );
};

export default Resources;
