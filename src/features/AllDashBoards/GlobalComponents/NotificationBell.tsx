import React, { useEffect, useMemo, useState } from "react";
import Bell from "../assets/images/Bell.svg";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  type NotificationItem,
} from "../../../api/notificationService";

const formatNotificationTime = (dateValue?: string): string => {
  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString();
};

const NotificationBell: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications]
  );

  const loadNotifications = async () => {
    setIsLoading(true);
    setError("");

    try {
      const nextNotifications = await getNotifications();
      setNotifications(nextNotifications);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load notifications"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();

    const intervalId = window.setInterval(loadNotifications, 30000);
    return () => window.clearInterval(intervalId);
  }, []);

  const handleToggle = () => {
    setShowNotifications((current) => !current);
  };

  const handleNotificationClick = async (notification: NotificationItem) => {
    if (notification.isRead) {
      return;
    }

    setNotifications((current) =>
      current.map((item) =>
        item._id === notification._id ? { ...item, isRead: true } : item
      )
    );

    try {
      await markNotificationRead(notification._id);
    } catch {
      setNotifications((current) =>
        current.map((item) =>
          item._id === notification._id ? { ...item, isRead: false } : item
        )
      );
    }
  };

  const handleMarkAllRead = async () => {
    const previousNotifications = notifications;

    setNotifications((current) =>
      current.map((notification) => ({ ...notification, isRead: true }))
    );

    try {
      await markAllNotificationsRead();
    } catch {
      setNotifications(previousNotifications);
    }
  };

  return (
    <div className="notification">
      <button
        type="button"
        className="notification-button"
        onClick={handleToggle}
        aria-label="Notifications"
      >
        <img src={Bell} className="search" alt="" />
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button type="button" onClick={handleMarkAllRead}>
                Mark all read
              </button>
            )}
          </div>

          {isLoading && notifications.length === 0 ? (
            <p>Loading notifications...</p>
          ) : error ? (
            <p>{error}</p>
          ) : notifications.length === 0 ? (
            <p>No new notifications</p>
          ) : (
            <div className="notification-list">
              {notifications.map((notification) => (
                <button
                  type="button"
                  key={notification._id}
                  className={`notification-item${
                    notification.isRead ? "" : " unread"
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <span className="notification-title">
                    {notification.title}
                  </span>
                  <span className="notification-message">
                    {notification.message}
                  </span>
                  <span className="notification-time">
                    {formatNotificationTime(notification.createdAt)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
