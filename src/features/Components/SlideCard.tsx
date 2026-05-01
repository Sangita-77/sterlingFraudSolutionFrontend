import "./IndexComponents.css";
interface CardProps {
  image: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description, image}) => {
  return (
    <div className="Slidercard">
      <img src={image} alt={title} className="card-img" />
      <p className="card-desc">{description}</p>
      <h4 className="card-title">{title}</h4>
    </div>
  );
};

export default Card;