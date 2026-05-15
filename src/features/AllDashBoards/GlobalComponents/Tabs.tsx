import React, { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  variant?: "default" | "underline";
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  variant = "default",
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`DashboardsTabs ${variant}`}>
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-btn 
              ${activeTab === index ? "active" : ""} 
              ${variant}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tabs-content">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;