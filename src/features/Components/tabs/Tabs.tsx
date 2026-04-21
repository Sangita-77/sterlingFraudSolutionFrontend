import React, { useState } from "react";
import "../BTCAddressModel.css";
import Transactions from "./Transactions";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"transactions" | "connections" | "mentions">("transactions");

  const tabs = [
    { id: "transactions", label: "Transactions" },
    { id: "connections", label: "Connections"  },
    { id: "mentions", label: "Mentions" },
  ];

  return (
    <div className="TabsContainer">
      <div className="Tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`Tab ${tab.id === activeTab ? "activetab" : ""}`}
          >
            {tab.label} <span>expert</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        {activeTab === "transactions" && <div>
          <Transactions />
        </div>}
        {activeTab === "connections" && <div>Connections Content </div>}
        {activeTab === "mentions" && <div>Mentions Content</div>}
      </div>
    </div>
  );
};

export default Tabs;