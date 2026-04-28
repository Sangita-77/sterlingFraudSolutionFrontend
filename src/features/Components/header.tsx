import "./IndexComponents.css";
import { useTranslation } from 'react-i18next';
import Logo from "../../assets/LogoW.webp";
import Button from "../Components/ButtonCompo";
import { NavLink } from "react-router-dom";
import { routes } from "../../Routes/route";
<<<<<<< HEAD
import AuthenticationModel from "./AuthenticationModels";
import RegisterForm from "./authentication-form/RegisterForm";
import LoginForm from "./authentication-form/LoginForm";
import { useState } from "react";
import ForgetPasswordForm from "./authentication-form/ForgetPaswordForm";
import SendCode from "./authentication-form/SendCode";
=======
import Modal from "./Modal";
import {Heading4 , Paragraph} from "./Headings";  
import RegisterForm from "./RegisterForm";
import RegImage from "../../assets/images/RegImage.webp";
import LanguageSwitcher from "./LanguageSwitcher";

>>>>>>> 4e6051c3a2a207a1b6c57886664634423361b3d4

type HeaderProps = {
  variant?: "transparent" | "colored";
};

<<<<<<< HEAD
const Header: React.FC<HeaderProps> = ({ variant }: any) => {
=======
const Header: React.FC<HeaderProps> = ({ variant }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { t } = useTranslation();
>>>>>>> 4e6051c3a2a207a1b6c57886664634423361b3d4

  const [isRegisterModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isForgetPasswordModelOpen, setIsForgetPasswordModelOpen] = useState(false);
  const [isSendCodeModelOpen, setIsSendCodeModelOpen] = useState(false);
  
  return (
    <>
      <header className={`header ${variant}`} >
        <div className="container">

          {/* Logo */}
          <div className="logo">
            <NavLink to={routes.VERIFYCHAIN} className="Logout">
              <img src={Logo} alt="Company Logo" />
            </NavLink>
          </div>

          {/* Navigation */}
          <nav className="ButtonRight">
<<<<<<< HEAD
            <Button text="Login" variant="solid" size="md" onClick={() => setIsLoginModalOpen(true)} />
            <Button text="Sign Up" variant="trashparent" size="md" onClick={() => setIsModalOpen(true)} />
=======
            <LanguageSwitcher />
            <Button
              onClick={() => setActiveModal("login")} text={t('common.login')} variant="solid"
            />
            <Button
              onClick={() => setActiveModal("signup")} text={t('common.signUp')} variant="trashparent"
            />
>>>>>>> 4e6051c3a2a207a1b6c57886664634423361b3d4
          </nav>
        </div>
      </header>

      {/* Registration Model */}

      <AuthenticationModel
        isOpen={isRegisterModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registration"
        size="register"
        titleSize="register-title"
        imageSize="register-left-image"
        spaceInput="register-space"
        formComponents={<RegisterForm onClose={() => setIsModalOpen(false)} clickLogin={() => setIsLoginModalOpen(true)} />}

        
      />
      {/* Login Model */}
      <AuthenticationModel
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Login"
        size="login"
        titleSize="login-title"
        imageSize="login-left-image"
        spaceInput="login-space"
        formComponents={<LoginForm onClose={() => setIsLoginModalOpen(false)} clickRegister={() => setIsModalOpen(true)} openForgetPassword={() => setIsForgetPasswordModelOpen(true)} />}

      />
      {/* Forget Password Model */}

      <AuthenticationModel
        isOpen={isForgetPasswordModelOpen}
        onClose={() => setIsForgetPasswordModelOpen(false)}
        title="Forget Password"
        size="forgetPassword"
        titleSize="forgetPassword-title"
        imageSize="forgetPassword-left-image"
        spaceInput="forgetPassword-space"
        formComponents={<ForgetPasswordForm onClose={() => setIsForgetPasswordModelOpen(false)} openSendCode={() => setIsSendCodeModelOpen(true)} />}
      />

      {/* Send Code Model */}

      <AuthenticationModel
        isOpen={isSendCodeModelOpen}
        onClose={() => setIsSendCodeModelOpen(false)}
        title="Enter Code"
        size="sendCode"
        titleSize="sendCode-title"
        imageSize="sendCode-left-image"
        spaceInput="sendCode-space"
        formSize="sendCode-form"
        formComponents={<SendCode onClose={() => setIsSendCodeModelOpen(false)} />}
      />
    </>
  );
};

export default Header;