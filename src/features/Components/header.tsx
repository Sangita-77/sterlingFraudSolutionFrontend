import { useEffect, useState } from "react";
import "./IndexComponents.css";
import Logo from "../../assets/LogoW.webp";
import Button from "../Components/ButtonCompo";
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../../Routes/route";
import AuthenticationModel from "./AuthenticationModels";
import RegisterForm from "./authentication-form/RegisterForm";
import LoginForm from "./authentication-form/LoginForm";
import ForgetPasswordForm from "./authentication-form/ForgetPaswordForm";
import SendCode from "./authentication-form/SendCode";
import RegisterSuccess from "./authentication-form/RegisterSuccess";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';
import {
  getAuthUser,
  getAuthorizedLandingRoute,
  logoutUser,
  subscribeToAuthChanges,
} from "../../api/authService";



type HeaderProps = {
  variant?: "transparent" | "colored";
};


const Header: React.FC<HeaderProps> = ({ variant }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isRegisterModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isForgetPasswordModelOpen, setIsForgetPasswordModelOpen] = useState(false);
  const [isSendCodeModelOpen, setIsSendCodeModelOpen] = useState(false);
  const [isRegisterSuccessOpen, setIsRegisterSuccessOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getAuthUser()));

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(Boolean(getAuthUser()));
    };

    const unsubscribe = subscribeToAuthChanges(syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  const handleDashboardClick = () => {
    const nextRoute = getAuthorizedLandingRoute(getAuthUser());
    if (nextRoute) {
      navigate(nextRoute);
    }
  };

  const handleLogout = async () => {
    await logoutUser(true);
    navigate(routes.VERIFYCHAIN);
  };

  const handleRegisterSuccess = () => {
    setIsRegisterSuccessOpen(true);
  };

  const handleSuccessLogin = () => {
    setIsRegisterSuccessOpen(false);
    setIsLoginModalOpen(true);
  };

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
            <LanguageSwitcher />
            {isLoggedIn ? (
              <>
                <Button text="Dashboard" variant="solid" size="md" onClick={handleDashboardClick} />
                <Button text="Logout" variant="trashparent" size="md" onClick={handleLogout} />
              </>
            ) : (
              <>
                <Button text={t('common.login')} variant="solid" size="md" onClick={() => setIsLoginModalOpen(true)} />
                <Button text={t('common.signUp')} variant="trashparent" size="md" onClick={() => setIsModalOpen(true)} />
              </>
            )}
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
        formComponents={
          <RegisterForm
            onClose={() => setIsModalOpen(false)}
            clickLogin={() => setIsLoginModalOpen(true)}
            onSuccess={handleRegisterSuccess}
          />
        }

        
      />
      <AuthenticationModel
        isOpen={isRegisterSuccessOpen}
        onClose={() => setIsRegisterSuccessOpen(false)}
        title="Success"
        size="login"
        titleSize="login-title"
        imageSize="login-left-image"
        spaceInput="login-space"
        formComponents={<RegisterSuccess onLogin={handleSuccessLogin} />}
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
