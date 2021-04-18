import React, { useState } from "react";
import Name from "./Name";
import Tag from "./Tag";
import Flavor from "./Flavor";
import Description from "./Description";
import Ranks from "./Ranks";
import PlusMinus from "./PlusMinus";
import ExpandCollapse from "./ExpandCollapse";
import Table from "./Table";
import Col from "react-bootstrap/Col";
import { FaHammer, FaRecycle } from "react-icons/fa";

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);

  const {
    name,
    tags,
    flavor,
    description,
    ranks,
    table,
    value,
    crafting,
  } = props.card;

  const ifTable = (table) => {
    if (table !== undefined) {
      return (
        <span>
          <Table table={table} />
        </span>
      );
    }
  };

  const ifRanks = (ranks, deleteFrom) => {
    if (ranks.length < 2) {
      return (
        <span>
          <Ranks ranks={ranks} deleteFrom="single" />
        </span>
      );
    } else {
      return (
        <span>
          <Ranks ranks={ranks} deleteFrom={deleteFrom} />
        </span>
      );
    }
  };

  const ifDamage = (table) => {
    if (typeof table == "string") {
      return (
        <span className="bit">
          <span className="tag">Damage: </span>
          <span>{table}</span>
        </span>
      );
    }
  };

  const ifItem = (deleteFrom) => {
    if (deleteFrom === "items") {
      return (
        <span className="right margin">
          <FaHammer className="button scaleup margintop" />
          <FaRecycle className="button scaleup margintop marginleft" />
        </span>
      );
    }
  };

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

  const expandCollapse = (status) => {
    if (status === true) {
      setExpanded(() => {
        return false;
      });
    } else {
      setExpanded(() => {
        return true;
      });
    }
  };

  if (expanded === false) {
    return (
      <Col xs={12} md lg={6} xl={4}>
        <article className="item">
          <div className="row">
            <Name
              name={name}
              expanded={expanded}
              expandCollapse={expandCollapse}
            />
            <span className="right">
              <PlusMinus
                card={props.card}
                form={props.form}
                placement={props.placement}
                deleteFrom={props.deleteFrom}
              />
              {ifItem(props.deleteFrom)}
            </span>
          </div>
          {tags.map((tag, index) => {
            return <Tag tag={tag} key={index} />;
          })}
        </article>
      </Col>
    );
  }
  return (
    <Col xs={12} md lg={6} xl={4}>
      <article className="item">
        <div className="row">
          <Name
            name={name}
            expanded={expanded}
            expandCollapse={expandCollapse}
          />
          <span className="right">
            <PlusMinus
              card={props.card}
              form={props.form}
              placement={props.placement}
              deleteFrom={props.deleteFrom}
            />
            {ifItem(props.deleteFrom)}
          </span>
        </div>
        <hr></hr>
        {tags.map((tag) => {
          return <Tag tag={tag} />;
        })}
        <Flavor flavor={flavor} />
        <Description description={description} />
        {ifItem2()}
        {ifDamage(table)}
        {ifTable(table)}
        <hr></hr>
        <div className="bit">{ifRanks(ranks, props.deleteFrom)}</div>
      </article>
    </Col>
  );
};

export default Card;
