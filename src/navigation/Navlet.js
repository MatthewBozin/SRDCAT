import React, { useContext } from "react";
import Context from "../data/context.js";

const Navlet = (props) => {
  const [context, setContext] = useContext(Context);

  const ifContext = () => {
    if (context.collections === props.navlet.name) {
      return (
        <button
          className="button2 bordered padded right"
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
    } else {
      return (
        <button
          className="button bordered padded right"
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
    }
  };

  return <span>{ifContext()}</span>;
};

export default Navlet;
