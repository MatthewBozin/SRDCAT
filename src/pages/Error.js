import React, { useState } from "react";
import { Link } from "react-router-dom";
import { s } from "../data/exports.js";

function Error() {
  const snippets = [
    "Beings older than time howl into an incomprehensible void, for their pages couldn't be found.",
    "Your page couldn't be found. RRYPO ate it, and he's not letting us into his mouth.",
    "Eras come and go, civilizations rise and fall, and still, the page you were looking for remains lost.",
  ];
  const [error] = useState(s(snippets));
  return (
    <div className="item">
      <div>{error}</div>
      <div>(insert image of engineer penglings repairing RRYPO)</div>
      <Link className="button bordered" to="/">
        Return Home
      </Link>
    </div>
  );
}

export default Error;
