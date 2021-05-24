import React from "react";

const Name = (props) => {
  let expandCollapse = props.expandCollapse;
  let expanded = props.expanded;
  return (
    <div
      className="button cardname"
      onClick={() => {
        expandCollapse(expanded);
      }}
    >
      {props.name}
    </div>
  );
};

export default Name;
