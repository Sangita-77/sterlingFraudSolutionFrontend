import React from "react";
import "./Components.css";

interface CardProps {
  title: string;
  value: string;
  icon: string;
  variant?: "blue" | "purple" | "pink";
}

const Card: React.FC<CardProps> = ({
  title,
  value,
  icon,
  variant = "blue",
}) => {
  return (
    <div className={`SuperAdmincard ${variant}`}>
      <div className="CardIcon">
        <img src={icon} alt="" />
      </div>

      <div className="CardText">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Card;