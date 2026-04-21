import "./IndexComponents.css";

interface ButtonProps {
  text: string;
//   value: string;
//   icon: string;
  variant?: "solid" | "trashparent" ;
}

const Buttons: React.FC<ButtonProps> = ({
  text,
//   value,
//   icon,
  variant = "trashparent",
}) => {return (
    <button className={`compoBtn ${variant}`}>{text}</button>
  );
};

export default Buttons;