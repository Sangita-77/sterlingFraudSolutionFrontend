import { BASE_URL } from "./config";
import { routes } from "../Routes/route";

export type AuthSession = {
  userId: string;
  sessionId: string;
  refreshToken: string;
  accessToken?: string;
  expiresAt?: number;
};

export type AuthUser = {
  id?: string;
  userId?: number;
  name: string;
  email: string;
  flag?: number;
  status?: number;
};

type RefreshTokenResponse = {
  success: boolean;
  accessToken?: string;
  expiresIn?: number;
  message?: string;
};

type LogoutResponse = {
  success: boolean;
  message?: string;
};

const AUTH_SESSION_KEY = "authSession";
const AUTH_USER_KEY = "authUser";
const AUTH_STATE_CHANGED_EVENT = "auth-state-changed";

export type RouteGroup = "admin" | "agent" | "customer";

const notifyAuthStateChanged = (): void => {
  window.dispatchEvent(new Event(AUTH_STATE_CHANGED_EVENT));
};

export const getAuthSession = (): AuthSession | null => {
  const savedSession = localStorage.getItem(AUTH_SESSION_KEY);

  if (!savedSession) {
    return null;
  }

  try {
    return JSON.parse(savedSession) as AuthSession;
  } catch (error) {
    console.error("Failed to parse auth session:", error);
    localStorage.removeItem(AUTH_SESSION_KEY);
    return null;
  }
};

export const saveAuthSession = (session: AuthSession): void => {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  notifyAuthStateChanged();
};

export const clearAuthSession = (): void => {
  localStorage.removeItem(AUTH_SESSION_KEY);
  notifyAuthStateChanged();
};

export const getAuthUser = (): AuthUser | null => {
  const savedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser) as AuthUser;
  } catch (error) {
    console.error("Failed to parse auth user:", error);
    localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
};

export const saveAuthUser = (user: AuthUser): void => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  notifyAuthStateChanged();
};

export const clearAuthUser = (): void => {
  localStorage.removeItem(AUTH_USER_KEY);
  notifyAuthStateChanged();
};

export const clearAuthState = (): void => {
  localStorage.removeItem(AUTH_SESSION_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  notifyAuthStateChanged();
};

export const subscribeToAuthChanges = (
  listener: () => void
): (() => void) => {
  window.addEventListener(AUTH_STATE_CHANGED_EVENT, listener);
  return () => window.removeEventListener(AUTH_STATE_CHANGED_EVENT, listener);
};

export const canAccessAdmin = (user: AuthUser | null): boolean => {
  return user?.status === 1 && user?.flag === 0;
};

export const canAccessAgent = (user: AuthUser | null): boolean => {
  return user?.status === 1 && user?.flag === 1;
};

export const canAccessCustomer = (user: AuthUser | null): boolean => {
  return user?.status === 1 && user?.flag === 2;
};

export const canAccessRouteGroup = (
  user: AuthUser | null,
  routeType: RouteGroup
): boolean => {
  switch (routeType) {
    case "admin":
      return canAccessAdmin(user);
    case "agent":
      return canAccessAgent(user);
    case "customer":
      return canAccessCustomer(user);
    default:
      return false;
  }
};

export const getAuthorizedLandingRoute = (
  user: AuthUser | null
): string | null => {
  if (canAccessAdmin(user)) {
    return routes.DASHBOARD;
  }

  if (canAccessAgent(user)) {
    return routes.AGENT_DASHBOARD;
  }

  if (canAccessCustomer(user)) {
    return routes.CUSTOMER_DASHBOARD;
  }

  return null;
};

export const logoutUser = async (logoutAll = true): Promise<boolean> => {
  const session = getAuthSession();
  const user = getAuthUser();

  if (!session?.sessionId || !session.userId) {
    clearAuthState();
    return true;
  }

  const bearerToken = session.accessToken ?? (await getValidAccessToken());

  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
      },
      body: JSON.stringify({
        sessionId: session.sessionId,
        logoutAll,
        userId: user?.id || String(session.userId),
      }),
    });

    const result: LogoutResponse = await response.json();
    return response.ok && result.success;
  } catch (error) {
    console.error("Logout request failed:", error);
    return false;
  } finally {
    clearAuthState();
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const session = getAuthSession();

  if (!session?.userId || !session.sessionId || !session.refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.userId,
        sessionId: session.sessionId,
        refreshToken: session.refreshToken,
      }),
    });

    const result: RefreshTokenResponse = await response.json();

    if (!response.ok || !result.success || !result.accessToken) {
      return null;
    }

    const nextSession: AuthSession = {
      ...session,
      accessToken: result.accessToken,
      expiresAt: result.expiresIn
        ? Date.now() + result.expiresIn * 1000
        : session.expiresAt,
    };

    saveAuthSession(nextSession);
    return result.accessToken;
  } catch (error) {
    console.error("Refresh token request failed:", error);
    return null;
  }
};

export const getValidAccessToken = async (): Promise<string | null> => {
  const session = getAuthSession();

  if (!session) {
    return null;
  }

  const hasUsableToken =
    session.accessToken &&
    (!session.expiresAt || session.expiresAt > Date.now() + 30_000);

  if (hasUsableToken) {
    return session.accessToken ?? null;
  }

  return refreshAccessToken();
};

export const fetchWithAuth = async (
  input: string,
  init: RequestInit = {}
): Promise<Response> => {
  const token = await getValidAccessToken();
  const headers = new Headers(init.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshedToken = await refreshAccessToken();

  if (!refreshedToken) {
    return response;
  }

  headers.set("Authorization", `Bearer ${refreshedToken}`);

  response = await fetch(input, {
    ...init,
    headers,
  });

  return response;
};
