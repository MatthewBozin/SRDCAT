import React, { useState } from "react";
import Name from "./Name";
import Tag from "./Tag";
import Flavor from "./Flavor";
import Description from "./Description";
import Ranks from "./Ranks";
import AddSubtract from "./AddSubtract";
import Table from "./Table";

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  const { name, tags, flavor, description, ranks, table, value, crafting } =
    props.card;

  let savedrank = 0;
  if (props.card.savedrank !== undefined) {
    savedrank = props.card.savedrank;
  }

  let savedresult = undefined;
  if (props.card.savedresult !== undefined) {
    savedresult = props.card.savedresult;
  }

  const ifItem2 = () => {
    if (value !== undefined && crafting !== undefined) {
      let fullcraft = crafting.join(", ");
      return (
        <div>
          <div>
            <span className="padded5px">
              <span className="orangetext">Value: </span>
              <span>{value}</span>
            </span>
          </div>
          <div>
            <span className="padded5px">
              <span className="orangetext">Crafting: </span>
              <span>{fullcraft}</span>
            </span>
          </div>
        </div>
      );
    }
  };

  const noBreakpointsIfHeroSheet = () => {
    if (props.deleteFrom === "none") {
      return "col-xs-12 col-md-6 col-lg-6 col-xl-4";
    }
    return "fullwidth mright15px";
  };

  return (
    <div className={noBreakpointsIfHeroSheet()}>
      <div className="outerbox">
        <div className="row">
          <Name
            name={name}
            expanded={expanded}
            expandCollapse={expandCollapse}
          />
          <span className="rightfloat mright12px mtop4px">
            <AddSubtract
              card={props.card}
              form={props.form}
              placement={props.placement}
              deleteFrom={props.deleteFrom}
            />
            {/*props.deleteFrom === "items" && (
              <span className="rightfloat mright15px">
                <FaHammer className="icon" />
                <FaRecycle className="icon" />
              </span>
            )*/}
          </span>
        </div>
        {expanded === false && props.deleteFrom === "none" && (
          <span>
            {tags.map((tag, index) => {
              return <Tag tag={tag} key={index} />;
            })}
          </span>
        )}
        {expanded === true && (
          <span>
            <hr></hr>
            {tags.map((tag, index) => {
              return <Tag tag={tag} key={index} />;
            })}
            <Flavor flavor={flavor} />
            <Description description={description} />
            {ifItem2()}
            {typeof table === "string" && (
              <span className="padded5px">
                <span className="orangetext">Damage: </span>
                <span>{table}</span>
              </span>
            )}
            {table !== undefined && (
              <span>
                <Table
                  table={table}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                />
              </span>
            )}
            <hr></hr>
            <div className="padded5px">
              {ranks.length < 2 ? (
                <span>
                  <Ranks ranks={ranks} deleteFrom="single" />
                </span>
              ) : (
                <span>
                  <Ranks
                    ranks={ranks}
                    savedrank={savedrank}
                    deleteFrom={props.deleteFrom}
                    placement={props.placement}
                    category={props.category}
                  />
                </span>
              )}
            </div>
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
