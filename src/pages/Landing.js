import React, { useContext, useEffect, useState } from "react";
import Context from "../data/context";
import LandingOption from "../components/bits/LandingOption";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const Landing = () => {
  const [context, setContext] = useContext(Context);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const changePage = (newPage) => {
    let newContext = context;
    newContext.link = newPage;
    setContext(JSON.parse(JSON.stringify(newContext)));
  };

  let image = require("../data/landing.png");

  return (
    <div className="outerbox">
        <Row>
            <Col>
                <span className="heading fontsize48 mleft12px">SRDCAT</span>
                <span className="heading">v0.9.9 [beta]</span>
                <LandingOption name={"COLLECTIONS"} page={"collections"} method={changePage} text={"CONTENT CARD DATABASE"} />
                <LandingOption name={"HERO SHEET"} page={"sheet"} method={changePage} text={"INTERACTIVE CHARACTER SHEET"} />
                <LandingOption name={"TOP CAT TOOLKIT"} text={"UNDER CONSTRUCTION"} />
                <LandingOption name={"RULES"} text={"UNDER CONSTRUCTION"} />
                <LandingOption name={"ABOUT"} page={"about"} method={changePage} text={"CREDITS AND OTHER INFO"} />
            </Col>
            {isDesktop && 
                <Col>
                    <img src={image}></img>
                </Col>
            }
            
        </Row>
    </div>
  )
}

export default Landing