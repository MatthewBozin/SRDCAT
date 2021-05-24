import React, { useContext } from "react";
import Context from "../data/context.js";
import { Link } from "react-router-dom";

const Linklet = (props) => {
  const [context, setContext] = useContext(Context);

  return (
    <Link
      className={
        context.link === props.type
          ? "link button--selected bordered"
          : "link button bordered"
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
