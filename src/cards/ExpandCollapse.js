import React from "react";
import { FaExpandArrowsAlt, FaCompressArrowsAlt } from "react-icons/fa";

const ExpandCollapse = (props) => {
  let expandCollapse = props.expandCollapse;

  if (props.expanded === true) {
    return (
      <button className="bit right button bordered padded2 margin">
        <FaCompressArrowsAlt
          className="bpad"
          onClick={() => {
            expandCollapse();
          }}
        ></FaCompressArrowsAlt>
      </button>
    );
  }
  return (
    <button className="bit right button bordered padded2 margin">
      <FaExpandArrowsAlt
        className="bpad"
        onClick={() => {
          expandCollapse();
        }}
      ></FaExpandArrowsAlt>
    </button>
  );
};

export default ExpandCollapse;
