import React from "react";

function NameValuePair(props) {
  return (
    <div className="pbottom8px">
      <span>
        <span className="orangetext">{props.name}: </span>
        <span>{props.value}</span>
      </span>
    </div>
  );
}

export default NameValuePair;
