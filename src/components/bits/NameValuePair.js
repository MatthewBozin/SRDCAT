import React from "react";
import HyperText from "./HyperText";

function NameValuePair(props) {
  return (
    <div className="pbottom8px">
      <span>
        <span className="orangetext">{props.name}: </span>
        {typeof props.value === "string" && props.value.includes("*") && <HyperText text={props.value}/>}
        {(typeof props.value !== "string" || !props.value.includes("*")) && <span>{props.value}</span>}
      </span>
    </div>
  );
}

export default NameValuePair;
