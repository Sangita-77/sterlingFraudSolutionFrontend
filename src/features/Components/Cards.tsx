import React, { useEffect, useRef, useState } from "react";

interface CardProps {
  title: string;
  paragraph: string;
  icon: React.ReactNode; 
}

const Card: React.FC<CardProps> = ({ title, paragraph, icon }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
      }
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`IndexCards ${visible ? "show" : ""}`}
    >
      <div className="CardIcon">
        {icon}
      </div>

      <div className="CardText">
        <h4>{title}</h4>
        <p>{paragraph}</p>
      </div>
    </div>
  );
};

export default Card;