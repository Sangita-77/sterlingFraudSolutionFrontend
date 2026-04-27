import "./IndexComponents.css";
interface CardProps {
  image: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description, image}) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-img" />
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{description}</p>
    </div>
  );
};

export default Card;