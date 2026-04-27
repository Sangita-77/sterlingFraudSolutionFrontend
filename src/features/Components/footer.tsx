import SocialMedia from "./socialmedia";
// Example icons (you can use react-icons or images)
import Facebook from "../../assets/images/Facebook.svg";
import LinkedIn from "../../assets/images/LinkedIn.svg";
import Twitter from "../../assets/images/Twitter.svg";
import GooglePlus from "../../assets/images/GooglePlus.svg";

interface FooterProps {
  siteName: string;
}

const Footer: React.FC<FooterProps> = ({ siteName }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, link: "https://facebook.com" },
    { icon: LinkedIn, link: "https://linkedin.com" },
    { icon: Twitter, link: "https://twitter.com" },
    { icon: GooglePlus, link: "https://google.co.in" },
  ];

  return (
    <footer>
      <div className="container">
        <div className="footerWrap">

          <div className="copyright footerWrapChilds">
            © {currentYear} {siteName}. All rights reserved.
          </div>

          <div className="Social_media footerWrapChilds">
            <SocialMedia items={socialLinks} />
          </div>
 
          <div className="siteName footerWrapChilds">
             {siteName}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;