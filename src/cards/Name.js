import React from "react";

const Name = (props) => {
  let expandCollapse = props.expandCollapse;
  let expanded = props.expanded;
  return (
    <h4
      className="button bit padded3"
      onClick={() => {
        expandCollapse(expanded);
      }}
    >
      {props.name}
    </h4>
  );
};

export default Name;
