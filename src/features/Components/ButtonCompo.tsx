import "./IndexComponents.css";

interface ButtonProps {
  text: string;
//   value: string;
  icon?: any;
  variant?: "solid" | "trashparent" | "primary" |"danger-t" |"black-t";
  size?: "sm" | "md" | "lg";

 

}

const Buttons: React.FC<ButtonProps> = ({
  text,
//   value,
  icon,
  variant = "trashparent",
  size = "md",


}) => {return (
    <button className={`compoBtn ${variant}  ${size}`}><span>{icon} {text}</span></button>
  );
};

export default Buttons;