import React, { useContext } from "react";
import Context from "../data/context.js";
import { Link } from "react-router-dom";

const Linklet = (props) => {
  const [context, setContext] = useContext(Context);

  return (
    <Link
      className={
        context.link === props.type
          ? "button2 bordered padded right"
          : "button bordered padded right"
      }
      onClick={() =>
        setContext(() => {
          let newcontext = context;
          newcontext.link = props.type;
          let final = JSON.parse(JSON.stringify(newcontext));
          return final;
        })
      }
      to={props.link}
    >
      {props.text}
    </Link>
  );
};

export default Linklet;
