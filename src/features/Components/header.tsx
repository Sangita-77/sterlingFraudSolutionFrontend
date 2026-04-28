import "./IndexComponents.css";
import Logo from "../../assets/LogoW.webp";
import Button from "../Components/ButtonCompo";
import { NavLink } from "react-router-dom";
import { routes } from "../../Routes/route";
import AuthenticationModel from "./AuthenticationModels";
import RegisterForm from "./authentication-form/RegisterForm";
import LoginForm from "./authentication-form/LoginForm";
import { useState } from "react";
import ForgetPasswordForm from "./authentication-form/ForgetPaswordForm";
import SendCode from "./authentication-form/SendCode";

type HeaderProps = {
  variant?: "transparent" | "colored";
};

const Header: React.FC<HeaderProps> = ({ variant }: any) => {

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
            <Button text="Login" variant="solid" size="md" onClick={() => setIsLoginModalOpen(true)} />
            <Button text="Sign Up" variant="trashparent" size="md" onClick={() => setIsModalOpen(true)} />
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