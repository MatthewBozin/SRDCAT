import React, { useContext } from "react";
import Context from "../data/context";
import LandingOption from "../components/bits/LandingOption";
import { ReactComponent as Title} from "../data/icons/title.svg";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const Landing = () => {
  const [context, setContext] = useContext(Context);

  const changePage = (newPage) => {
    let newContext = context;
    newContext.link = newPage;
    setContext(JSON.parse(JSON.stringify(newContext)));
  };

  const changePersona = (newPersona) => {
    let newContext = context;
    newContext.persona = newPersona;
    setContext(JSON.parse(JSON.stringify(newContext)));
  }

  let image = require("../data/landing.png");

  return (
    <div className="outerbox">
        <Row>
            <Col>
                <Title className="landingtitlesvg mleft5px"/>
                <span className="heading ptop50px">v0.9.9 [beta]</span>
                <LandingOption name={"COLLECTIONS"} page={"collections"} method={changePage} text={"CONTENT CARD DATABASE"} />
                <LandingOption name={"HERO SHEET"} page={"sheet"} method={() => {changePage("sheet"); changePersona("PC");}} text={"INTERACTIVE CHARACTER SHEET"} />
                <LandingOption name={"TOP CAT TOOLKIT"} page={"sheet"} method={() => {changePage("sheet"); changePersona("TC");}} text={"UNDER CONSTRUCTION"} />
                <LandingOption name={"RULES"} text={"UNDER CONSTRUCTION"} />
                <LandingOption name={"ABOUT"} page={"about"} method={changePage} text={"CREDITS AND OTHER INFO"} />
            </Col>
            <img className="none992 mright12px" src={image} alt={"Seek the blessings of the great machine."}></img>
        </Row>
    </div>
  )
}

export default Landing