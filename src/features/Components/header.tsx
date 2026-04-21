import "./IndexComponents.css";
import Logo from "../../assets/LogoW.webp";
import Button from "../Components/ButtonCompo";

type HeaderProps = {
  variant?: "transparent" | "colored";
};

const Header: React.FC<HeaderProps> = ({variant}:any) => {

  return (
    <header className={`header ${variant}`} >
      <div className="container">

        {/* Logo */}
        <div className="logo">
          <img src={Logo} alt="" />
        </div>

        {/* Navigation */}
        <nav className="ButtonRight">
          <Button text="Login" variant="solid" />
          <Button text="Sign Up" variant="trashparent" />
        </nav>
      </div>
    </header>
  );
};

export default Header;