import "./IndexComponents.css";
import Logo from "../../assets/LogoW.webp";
import Button from "../Components/ButtonCompo"; 

const Header: React.FC = () => {


  return (
    <header className="header">
          <div className="container">

          {/* Logo */}
          <div className="logo">
            <img src={Logo} alt=""/>
          </div>

          {/* Navigation */}
          <nav className="ButtonRight">
           <Button text="Login" variant="solid"/>
           <Button text="Sign Up" variant="trashparent"/>
          </nav>
      </div>
    </header>
  );
};

export default Header;