import { BASE_URL } from "./config";
import { fetchWithAuth } from "./authService";

export type NotificationItem = {
  _id: string;
  title: string;
  message: string;
  action?: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  isRead: boolean;
  readAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type NotificationListResponse =
  | NotificationItem[]
  | {
      success?: boolean;
      notifications?: NotificationItem[];
      data?: NotificationItem[];
      message?: string;
    };

const readJsonResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  const text = await response.text();
  const preview = text.replace(/\s+/g, " ").trim().slice(0, 80);

  throw new Error(
    `Expected JSON but received ${contentType || "unknown content type"} from ${
      response.url
    }. Response starts with: ${preview || "empty response"}`
  );
};

const parseNotificationList = (
  result: NotificationListResponse
): NotificationItem[] => {
  if (Array.isArray(result)) {
    return result;
  }

  return result.notifications ?? result.data ?? [];
};

export const getNotifications = async (): Promise<NotificationItem[]> => {
  const response = await fetchWithAuth(`${BASE_URL}/notifications`);
  const result = await readJsonResponse<NotificationListResponse>(response);

  if (!response.ok) {
    const message = Array.isArray(result)
      ? "Failed to load notifications"
      : result.message || "Failed to load notifications";
    throw new Error(message);
  }

  return parseNotificationList(result);
};

export const markNotificationRead = async (id: string): Promise<void> => {
  const response = await fetchWithAuth(`${BASE_URL}/notifications/${id}/read`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to mark notification as read");
  }
};

export const markAllNotificationsRead = async (): Promise<void> => {
  const response = await fetchWithAuth(`${BASE_URL}/notifications/read-all`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to mark notifications as read");
  }
};
