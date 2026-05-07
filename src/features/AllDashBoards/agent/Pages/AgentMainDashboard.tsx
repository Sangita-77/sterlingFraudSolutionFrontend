// import React from "react";

// const AgentMainDashboard: React.FC = () => {
//   return <h2>Agent Dashboard</h2>;
// };

// export default AgentMainDashboard;


import React, { useEffect, useState } from "react";
import { getAuthUser, getUserRole, subscribeToAuthChanges } from "../../../../api/authService";

const AgentMainDashboard: React.FC = () => {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const updateRole = () => {
      const user = getAuthUser();
      setRole(getUserRole(user));
    };

    updateRole();

    const unsubscribe = subscribeToAuthChanges(updateRole);
    return unsubscribe;
  }, []);

  return (
    <div>
      Logged in as: <strong>{role}</strong>
    </div>
  );
};

export default AgentMainDashboard;