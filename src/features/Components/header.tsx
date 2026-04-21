import "./IndexComponents.css";
import Logo from "../../assets/LogoW.webp";

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
           <button>Login</button>
           <button>Sign Up</button>
          </nav>
      </div>
    </header>
  );
};

export default Header;