import "./IndexComponents.css";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  variant?: "solid" | "trashparent" | "primary" | "danger-t" | "black-t";
  size?: "sm" | "md" | "lg" | "full" | "form_side_btn";
  iconPosition?: "left" | "right"; 
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Buttons: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  variant = "trashparent",
  size = "md",
  iconPosition = "left",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      className={`compoBtn ${variant} ${size}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span>
        {iconPosition === "left" && icon}
        {text}
        {iconPosition === "right" && icon}
      </span>
    </button>
  );
};

export default Buttons;
