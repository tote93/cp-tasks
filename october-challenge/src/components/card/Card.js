import React from "react";
import "../styles/Card.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { useStateValue } from "../../StateProvider";
function Card({ Icon, userName, count, increase, type }) {
  const [{ darkMode }] = useStateValue();
  return (
    <div className="card">
      <p className="card__userName">
        {Icon}@{userName}
      </p>
      <div className="card__main">
        <h2>{count}</h2>
        <h3>followers</h3>
      </div>
      <p
        className={`card__increase ${type && "benefits"} ${
          darkMode && "invert"
        }`}
      >
        {type ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        {increase} today
      </p>
    </div>
  );
}

export default Card;
