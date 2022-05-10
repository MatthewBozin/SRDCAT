import React, { useContext } from "react";
import Context from "../../data/context.js";
import { ReactComponent as Collections } from "../../data/icons/collections.svg";
import { ReactComponent as Herosheet } from "../../data/icons/herosheet.svg";
import { FaGlobe } from "react-icons/fa";

const Linklet = (props) => {
  const [context, setContext] = useContext(Context);

  const displayIcon = () => {
    switch (props.type) {
      case "collections":
        if (context.link === props.type) {
          return <Collections className="iconsvgselected" />;
        }
        return <Collections className="iconsvg" />;
      case "herosheet":
        if (context.link === props.type) {
          return <Herosheet className="iconsvgselected" />;
        }
        return <Herosheet className="iconsvg" />;
      case "worldsheet":
        if (context.link === props.type) {
          return <FaGlobe className="pbottom5px" />;
        }
        return <FaGlobe className="pbottom5px" />;
      default: return;
    }
  };

  return (
    <div
      className={
        context.link === props.type
          ? "link button--selected bordered"
          : "link button bordered"
      }
      onClick={() =>
        setContext(() => {
          let newcontext = context;
          newcontext.link = props.link;
          let final = JSON.parse(JSON.stringify(newcontext));
          return final;
        })
      }
    >
      {displayIcon()}
      <span className="navletSpan">{props.text}</span>
    </div>
  );
};

export default Linklet;
