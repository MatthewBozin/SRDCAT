import React, { useContext } from "react";
import Context from "../data/context.js";
import { ReactComponent as Items } from "../data/icons/items.svg";
import { ReactComponent as Skills } from "../data/icons/skills.svg";
import { ReactComponent as Traits } from "../data/icons/traits.svg";
import { ReactComponent as Spells } from "../data/icons/magic.svg";
import { ReactComponent as Creatures } from "../data/icons/creatures.svg";

const Navlet = (props) => {
  const [context, setContext] = useContext(Context);

  const displayIcon = () => {
    console.log(context.collections);
    switch (props.navlet.name) {
      case "items":
        return <Items className="iconsvg" />;
      case "skills":
        return <Skills className="iconsvg" />;
      case "traits":
        return <Traits className="iconsvg" />;
      case "spells":
        return <Spells className="iconsvg" />;
      case "creatures":
        return <Creatures className="iconsvg" />;
    }
  };

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
          newcontext.search = "";
          let final = JSON.parse(JSON.stringify(newcontext));
          return final;
        })
      }
    >
      {displayIcon()}
      {context.collections === props.navlet.name && (
        <span className="navletSpan">{props.navlet.display}</span>
      )}
    </button>
  );
};

export default Navlet;
