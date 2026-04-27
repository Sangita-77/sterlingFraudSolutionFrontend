import React from "react";
import "./IndexComponents.css";

type SocialItem = {
  icon: string;    
  link: string;
};

interface SocialMediaProps {
  items: SocialItem[];
}

const SocialMedia: React.FC<SocialMediaProps> = ({ items }) => {
  return (
        <div className="mideaIcons">
         {items.map((item, index) => (
                <div className="socialMedia">
                    <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="socialIcon"
                    >
                    <img src={item.icon}/>
                    </a>
                </div>  
            ))}
 
    </div>
  );
};

export default SocialMedia;