import React, { useContext } from "react";
import Context from "../data/context";

const Tag = (props) => {
  const [context, setContext] = useContext(Context);

  const setTagSearch = () => {
    let context2 = context;
    context2.search = props.tag;
    setContext(() => {
      return JSON.parse(JSON.stringify(context2));
    });
  };

  return (
    <span className="bit button tag" onClick={setTagSearch}>
      #{props.tag}
    </span>
  );
};

export default Tag;
