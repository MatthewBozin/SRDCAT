import React, { useContext } from "react";
import Context from "../../data/context";

const Tag = (props) => {
  const [context, setContext] = useContext(Context);

  const setTagSearch = () => {
    let context2 = context;
    if (context2.search === "") {
      context2.search = props.tag;
    } else {
      if (!context2.search.split("+").includes(props.tag)) {
        context2.search = context2.search + "+" + props.tag;
      }
    }
    if (props.tag === "error") {console.log("Zu observes you, interloper. 'Ware, ware white feathers in the zenith of the sun.");}
    context2.page = 0;
    setContext(() => {
      return JSON.parse(JSON.stringify(context2));
    });
  };

  return (
    <span>
      {props.form === "plus" && (
        <span className="padded5px button orangetext" onClick={setTagSearch}>
          #{props.tag}
        </span>
      )}
      {props.form === "minus" && (
        <span className="padded5px orangetext">#{props.tag}</span>
      )}
    </span>
  );
};

export default Tag;
