import React from "react";
import Header from "./Components/header";
import SearchBar from "./Components/AddressNHashSearch";
import {Heading5 , Heading2 , Heading3, Paragraph} from "./Components/Headings";  
import Card from "./Components/Cards";
import { ActivityIcon, ShieldCheckIcon, SearchIcon } from 'lucide-animated';
import { ImageGallery } from "./Components/Brands";

import Vizualimg from "../assets/images/Vizualimg.webp";


// Brand Iamges
import OSCE from "../assets/images/osce.webp";
import CrimeSupport from "../assets/images/CrimeSupport.webp";
import AntiHuman from "../assets/images/Anti-Human.webp";
import Politie from "../assets/images/Politie.webp";
import GASA from "../assets/images/GASA.webp";
import UNODC from "../assets/images/UNODC.webp";

type ImageItem = {
  Brandimage: string;
  alt: string;
};
const images: ImageItem[] = [
  { Brandimage: OSCE, alt: "osce" },
  { Brandimage: CrimeSupport, alt: "CrimeSupport" },
  { Brandimage: GASA, alt: "GASA" },
  { Brandimage: AntiHuman, alt: "Anti-Human" },
  { Brandimage: Politie, alt: "Politie" },
  { Brandimage: UNODC, alt: "UNODC" },
];
// Brand Iamges


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

       
      </main>
    </>
  );
};

export default App;