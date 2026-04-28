import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  canAccessRouteGroup,
  clearAuthState,
  getAuthSession,
  getAuthUser,
  getValidAccessToken,
} from "../api/authService";
import { routes } from "./route";

type ProtectedRoleRouteProps = {
  routeType: "admin" | "agent" | "customer";
};

const ProtectedRoleRoute = ({ routeType }: ProtectedRoleRouteProps) => {
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const verifyAccess = async () => {
      const user = getAuthUser();
      const session = getAuthSession();

      if (!canAccessRouteGroup(user, routeType) || !session) {
        clearAuthState();
        if (isMounted) {
          setIsAllowed(false);
        }
        return;
      }

      const token = await getValidAccessToken();

      if (!isMounted) {
        return;
      }

      if (!token) {
        clearAuthState();
        setIsAllowed(false);
        return;
      }

      setIsAllowed(true);
    };

    verifyAccess();

    return () => {
      isMounted = false;
    };
  }, [routeType]);

  if (isAllowed === null) {
    return null;
  }

  if (!isAllowed) {
    return (
      <Navigate
        to={routes.VERIFYCHAIN}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoleRoute;
