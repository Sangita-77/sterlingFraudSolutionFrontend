import React, { useRef } from "react";
import SlideCard from "./SlideCard";
import "./IndexComponents.css";

interface CardItem {
  title: string;
  description: string;
  image: string;
}

interface SliderProps {
  items: CardItem[];
}

const CardSlider: React.FC<SliderProps> = ({ items }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="slider-wrapper">
      
      {/* Left Arrow */}
      <button className="nav-btn left" onClick={scrollLeft}>
        ‹
      </button>

      {/* Slider */}
      <div className="slider" ref={sliderRef}>
        <div className="slider-track">
          {items.map((item, index, image) => (
            <SlideCard
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button className="nav-btn right" onClick={scrollRight}>
        ›
      </button>
    </div>
  );
};

export default CardSlider;