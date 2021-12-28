import React from "react";
import { FaExpandArrowsAlt, FaCompressArrowsAlt } from "react-icons/fa";

const ExpandCollapse = (props) => {
  let expandCollapse = props.expandCollapse;

  if (props.expanded === true) {
    return (
      <button className="rightfloat button bordered padded5px margin5px mright15px">
        <FaCompressArrowsAlt
          className="pbottom5px"
          onClick={() => {
            expandCollapse();
          }}
        ></FaCompressArrowsAlt>
      </button>
    );
  }
  return (
    <button className="rightfloat button bordered padded5px margin5px mright15px">
      <FaExpandArrowsAlt
        className="pbottom5px"
        onClick={() => {
          expandCollapse();
        }}
      ></FaExpandArrowsAlt>
    </button>
  );
};

export default ExpandCollapse;
