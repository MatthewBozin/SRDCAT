import React, { useContext } from "react";
import Context from "../../data/context.js";
import { ReactComponent as Items } from "../../data/icons/items.svg";
import { ReactComponent as Skills } from "../../data/icons/skills.svg";
import { ReactComponent as Traits } from "../../data/icons/traits.svg";
import { ReactComponent as Spells } from "../../data/icons/magic.svg";
import { ReactComponent as Creatures } from "../../data/icons/creatures.svg";
import { FaMask, FaTree, FaPuzzlePiece } from "react-icons/fa";

const Navlet = (props) => {
  const [context, setContext] = useContext(Context);

  const displayIcon = () => {
    switch (props.navlet.name) {
      case "items":
        if (context.collections === props.navlet.name) {
          return <Items className="iconsvgselected" />;
        }
        return <Items className="iconsvg" />;
      case "skills":
        if (context.collections === props.navlet.name) {
          return <Skills className="iconsvgselected" />;
        }
        return <Skills className="iconsvg" />;
      case "traits":
        if (context.collections === props.navlet.name) {
          return <Traits className="iconsvgselected" />;
        }
        return <Traits className="iconsvg" />;
      case "spells":
        if (context.collections === props.navlet.name) {
          return <Spells className="iconsvgselected" />;
        }
        return <Spells className="iconsvg" />;
      case "creatures":
        if (context.collections === props.navlet.name) {
          return <Creatures className="iconsvgselected" />;
        }
        return <Creatures className="iconsvg" />;
      case "environments":
        if (context.collections === props.navlet.name) {
          return <FaTree className="iconsvg" />;
        }
        return <FaTree className="iconsvg" />;
      case "scenes":
        if (context.collections === props.navlet.name) {
          return <FaMask className="iconsvg" />;
        }
        return <FaMask className="iconsvg" />;
      case "props":
        if (context.collections === props.navlet.name) {
          return <FaPuzzlePiece className="iconsvg" />;
        }
        return <FaPuzzlePiece className="iconsvg" />;
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
