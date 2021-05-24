import React, { useState } from "react";
import Name from "./Name";
import Tag from "./Tag";
import Flavor from "./Flavor";
import Description from "./Description";
import Ranks from "./Ranks";
import PlusMinus from "./PlusMinus";
import Table from "./Table";
import Col from "react-bootstrap/Col";
import { FaHammer, FaRecycle } from "react-icons/fa";

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

  const ifItem2 = () => {
    if (value !== undefined && crafting !== undefined) {
      let fullcraft = crafting.join(", ");
      return (
        <div>
          <div>
            <span className="bit">
              <span className="tag">Value: </span>
              <span>{value}</span>
            </span>
          </div>
          <div>
            <span className="bit">
              <span className="tag">Crafting: </span>
              <span>{fullcraft}</span>
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <Col xs={12} md={6} lg={6} xl={4}>
      <article className="outerbox">
        <div className="row">
          <Name
            name={name}
            expanded={expanded}
            expandCollapse={expandCollapse}
          />
          <span className="right marginright">
            <PlusMinus
              card={props.card}
              form={props.form}
              placement={props.placement}
              deleteFrom={props.deleteFrom}
            />
            {props.deleteFrom === "items" && (
              <span className="right margin">
                <FaHammer className="button scaleup margintop" />
                <FaRecycle className="button scaleup margintop marginleft" />
              </span>
            )}
          </span>
        </div>
        {expanded === false && (
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
              <span className="bit">
                <span className="tag">Damage: </span>
                <span>{table}</span>
              </span>
            )}
            {table !== undefined && (
              <span>
                <Table table={table} />
              </span>
            )}
            <hr></hr>
            <div className="bit">
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
      </article>
    </Col>
  );
};

export default Card;
