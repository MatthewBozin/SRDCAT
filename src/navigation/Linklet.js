import React from "react";
import { Link } from "react-router-dom";

const Linklet = (props) => {
  return (
    <Link className="button bordered padded right" to={props.link}>
      {props.text}
    </Link>
  );
};

export default Linklet;
