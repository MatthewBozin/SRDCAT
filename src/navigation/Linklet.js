import React, { useContext } from "react";
import Context from "../data/context.js";
import { Link } from "react-router-dom";
import { ReactComponent as Collections } from "../data/icons/collections.svg";
import { ReactComponent as Herosheet } from "../data/icons/herosheet.svg";
import { FaGlobe } from "react-icons/fa";

const Linklet = (props) => {
  const [context, setContext] = useContext(Context);
  console.log(context);

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
    }
  };

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
      {displayIcon()}
      <span className="navletSpan">{props.text}</span>
    </Link>
  );
};

export default Linklet;
