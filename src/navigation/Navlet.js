import React, { useContext } from "react";
import Context from "../data/context.js";

const Navlet = (props) => {
  const [context, setContext] = useContext(Context);

  return (
    <button
      className={
        context.collections === props.navlet.name
          ? "link button--selected bordered flexgrow"
          : "link button bordered flexgrow"
      }
      onClick={() =>
        setContext(() => {
          let newcontext = context;
          newcontext.collections = props.navlet.name;
          let final = JSON.parse(JSON.stringify(newcontext));
          return final;
        })
      }
    >
      {props.navlet.display}
    </button>
  );
};

export default Navlet;
