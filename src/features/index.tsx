import React from "react";
import Header from "./Components/header";
import SearchBar from "./Components/AddressNHashSearch"

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
       <section className="HeroBanner">
        <div className="container">
            <h1>Access and verify on-chain <br/>
              data with Sterling Fraud Solution</h1>
            <p>Manage financial crime risk. Explore BTC addresses. Detect illicit activity</p>  
              <SearchBar/>
        </div>
      </section>
      </main>
    </>
  );
};

export default App;