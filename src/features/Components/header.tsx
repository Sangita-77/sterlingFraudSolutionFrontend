import React, { useState } from "react";
import "./IndexComponents.css";
import { useTranslation } from 'react-i18next';
import Logo from "../../assets/LogoW.webp";
import Button from "../Components/ButtonCompo";
import { NavLink } from "react-router-dom";
import { routes } from "../../Routes/route";
import Modal from "./Modal";
import {Heading4 , Paragraph} from "./Headings";  
import RegisterForm from "./RegisterForm";
import RegImage from "../../assets/images/RegImage.webp";
import LanguageSwitcher from "./LanguageSwitcher";


type HeaderProps = {
  variant?: "transparent" | "colored";
};

const Header: React.FC<HeaderProps> = ({ variant }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { t } = useTranslation();

  return (
    <>
      <header className={`header ${variant}`}>
        <div className="container">
          {/* Logo */}
          <div className="logo">
            <NavLink to={routes.VERIFYCHAIN} className="Logout">
              <img src={Logo} alt="Company Logo" />
            </NavLink>
          </div>

          {/* Navigation */}
          <nav className="ButtonRight">
            <LanguageSwitcher />
            <Button
              onClick={() => setActiveModal("login")} text={t('common.login')} variant="solid"
            />
            <Button
              onClick={() => setActiveModal("signup")} text={t('common.signUp')} variant="trashparent"
            />
          </nav>
        </div>
      </header>

      {/* Modal added here */}
          <Modal
            isOpen={!!activeModal}
            onClose={() => setActiveModal(null)}
          >

          {/* login Popup Start */}
            {activeModal === "login" &&
            <div className="loginForm">
              <div className="loginBackground">
              </div>
              <h2>Login Form</h2>
            </div>
             }
          {/* login Popup End */}

          
          {/* signup Popup Start */}
            {activeModal === "signup" && 
            <div className="signup FormWarp">
              <div className="signupBackground">
               <img src={RegImage}/>
               <h2>Investigate with starling</h2>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
              </div>
              <div className="signupFrom ModalsFrom">
                 <Heading4 text="Registration"/>
                 <div className="d-flex">
                    <Paragraph text="Already have an account?"/>
                    <Button onClick={() => setActiveModal("login")} text="Login" />
                 </div>
                 <RegisterForm/>
              </div>
            </div>
            }
          {/* signup Popup End */}

          </Modal>
    </>
  );
};

export default Header;