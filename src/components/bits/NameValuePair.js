import React from "react";

function NameValuePair(props) {
  return (
    <div>
      <span className="padded5px">
        <span className="orangetext">{props.name}: </span>
        <span>{props.value}</span>
      </span>
    </div>
  );
}

export default NameValuePair;
