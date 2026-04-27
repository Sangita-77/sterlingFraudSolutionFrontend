import React from "react";
import Header from "./Components/header";
import Footer from "./Components/footer";
import SearchBar from "./Components/AddressNHashSearch";
import {Heading5 , Heading2 , Heading3, Paragraph} from "./Components/Headings";  
import Button from "./Components/ButtonCompo";
import { ActivityIcon, ShieldCheckIcon, SearchIcon } from 'lucide-animated';
import { ImageGallery } from "./Components/Brands";
import Card from "./Components/Cards";
import CardSlider from "./Components/Cardslider";


import Vizualimg from "../assets/images/Vizualimg.webp";
import RightArrow from "../assets/images/RightArrow.svg";


// Brand Iamges
import OSCE from "../assets/images/osce.webp";
import CrimeSupport from "../assets/images/CrimeSupport.webp";
import AntiHuman from "../assets/images/Anti-Human.webp";
import Politie from "../assets/images/Politie.webp";
import GASA from "../assets/images/GASA.webp";
import UNODC from "../assets/images/UNODC.webp";

// Trusted Iamges
import CryptoCurrency from "../assets/images/CryptoCurrency.webp";
import ChamberDigital from "../assets/images/ChamberDigital.webp";
import INATBA from "../assets/images/INATBA.webp";
import CryptoUK from "../assets/images/CryptoUK.webp";
import CMIC from "../assets/images/CMIC.webp";
import GDF from "../assets/images/GDF.webp";
import PolitieLogo from "../assets/images/PolitieLogo.webp";
// import { BASE_URL } from "../api/config";

type ImageItem = {
  Brandimage: string;
  alt: string;
};
// Brand Iamges
const images: ImageItem[] = [
  { Brandimage: OSCE, alt: "osce" },
  { Brandimage: CrimeSupport, alt: "CrimeSupport" },
  { Brandimage: GASA, alt: "GASA" },
  { Brandimage: AntiHuman, alt: "Anti-Human" },
  { Brandimage: Politie, alt: "Politie" },
  { Brandimage: UNODC, alt: "UNODC" },
];
// Trusted Iamges
const secondImages: ImageItem[] = [
  { Brandimage: CryptoCurrency, alt: "CryptoCurrency" },
  { Brandimage: ChamberDigital, alt: "ChamberDigital" },
  { Brandimage: INATBA, alt: "INATBA" },
  { Brandimage: CryptoUK, alt: "CryptoUK" },
  { Brandimage: CMIC, alt: "CMIC" },
  { Brandimage: GDF, alt: "GDF" },
];


const slides = [
  { image: PolitieLogo, title: "Card 1", description: "“Having worked with Crystal for the last few months using their blockchain analysis program, we can say that the collaboration has been flawless so far. In part, due to the use of their software, we have been able to largely eliminate our backlog of files relating to the abuse of cryptocurrencies.”" },
  { image: PolitieLogo, title: "Card 2", description: "“Having worked with Crystal for the last few months using their blockchain analysis program, we can say that the collaboration has been flawless so far. In part, due to the use of their software, we have been able to largely eliminate our backlog of files relating to the abuse of cryptocurrencies.”" },
  { image: PolitieLogo, title: "Card 3", description: "“Having worked with Crystal for the last few months using their blockchain analysis program, we can say that the collaboration has been flawless so far. In part, due to the use of their software, we have been able to largely eliminate our backlog of files relating to the abuse of cryptocurrencies.”" },
];


const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>

        {/* Herro Banner Start */}
       <section className="HeroBanner">
        <div className="container">
            <h1>Access and verify on-chain <br/>
              data with Sterling Fraud Solution</h1>
            <p>Manage financial crime risk. Explore BTC addresses. Detect illicit activity</p>  
              <SearchBar/>
              
        </div>
      </section>
        {/* Herro Banner End */}

        {/* Our Solution Start */}
        <section className="Our_Solution">
           <div className="container">
              <Heading5 text="Our Solution"/>
              <Heading2 text="Sterling Fraud Solution is a free, easy-to-use blockchain exploratory tool for compliance teams and investigators"/>
              <div className="SolutionElements">
                    <Card 
                      title="Mitigate AML Risk" 
                      paragraph="Understand the potential risk associated with an address to safeguard from transacting with it"
                      icon={<ShieldCheckIcon size={40} stroke-width="1"/>} 
                    />
                  <Card 
                    title="Explore Addresses" 
                    paragraph="Discover who owns an address. Register for a free account to identify up to 15 address owners daily"
                    icon={<SearchIcon size={40}/>} 
                  />
                  <Card 
                    title="Explore Illicit Activity" 
                    paragraph="Investigate an address’s transaction history to determine if it is connected to bad actors or sanctioned entities"
                    icon={<ActivityIcon size={42} stroke-width="1"/>} 
                  />
              </div>
              <div className="EastToRead">
                  <div className="ESText">
                     <div className="TextPlate">
                      <Heading3 text="Easy to read"/>
                      <Paragraph text="The cutting-edge visualization tool makes it easy to see the flow of funds and connections"/>
                     </div>
                      <div className="TextPlate">
                      <Heading3 text="Advanced risk-scoring"/>
                      <Paragraph text="The cutting-edge visualization tool makes it easy to see the flow of funds and connections"/>
                     </div>
                     <div className="TextPlate">
                      <Heading3 text="Trusted data"/>
                      <Paragraph text="The cutting-edge visualization tool makes it easy to see the flow of funds and connections"/>
                     </div>
                  </div>
                  <div className="ESImage">
                       <img src={Vizualimg} alt="Vizualimg" />
                  </div>
              </div>
           </div>
        </section>
        {/* Our Solution End */}

        {/* Our Partner Start */}
        <section className="Our_Partners">
           <div className="container">
               <Heading5 text="Our Partners"/>
               <div className="Partners">
                  <ImageGallery images={images} />
               </div>
           </div>
        </section>
        {/* Our Partner End */}

        {/* Help center Section Start */}
        <section className="HelpSection">
           <div className="container">
              <div className="HelpCardWrap">
                  <div className="HelpCard">
                      <Heading2 text="Suspicious address?"/>
                      <Paragraph text="Suggest address ownership or report potential abuse, and Crystal will verify and confirm as soon as possible."/>
                      <div className="HelpBtn">
                        <Button text="Report" variant="trashparent" iconPosition="right" icon={<img src={RightArrow} />}/>
                      </div>
                  </div>
                  <div className="HelpCard">
                      <Heading2 text="Need help?"/>
                      <Paragraph text="We are confident your question can be answered in our FAQs."/>
                      <div className="HelpBtn">
                        <Button text="FAQ" variant="trashparent" iconPosition="right" icon={<img src={RightArrow} />}/>
                      </div>
                  </div>   
              </div>           
           </div>
        </section>
        {/* Help center Section End */}


        {/* Our Trusted Members Start */}
        <section  className="Our_trusted_members">
            <div className="container">
               <Heading5 text="Our Trusted members"/>
                  <div className="Members">
                      <ImageGallery images={secondImages} />
                  </div>
            </div>
        </section>
        {/* Our Trusted Members End */}

        {/* Trusted worldwide Start */}      
        <section className="Trusted_worldwide">
            <div className="container">
                <CardSlider items={slides} />
            </div>
        </section>
        {/* Trusted worldwide End */}      



      </main>
  

      {/* Footer Start */}
      <Footer siteName="SterlingFraudSolution"/>
      {/* Footer End */}

    </>
  );
};

export default App;