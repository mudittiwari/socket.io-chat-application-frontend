import React from "react";
import { FiHeart, FiMessageCircle } from 'react-icons/fi';
const NotificationCard = ({ username, message, time, read }) => {
    const notificationStyle = read
      ? 'bg-gray-100'
      : 'bg-gradient-to-r from-purple-400 to-pink-600';
    const textstyle=read?'text-gray-700':'text-white';
    return (
      <div className={`flex items-center justify-between px-4 my-2 py-3 ${notificationStyle} rounded-md`}>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://picsum.photos/id/237/200/300"
            alt={`${username}'s profile`}
          />
          <div className="ml-2">
            {/* <p className="font-medium text-sm">{user.name}</p> */}
            <p className={`text-xs ${textstyle}`}>{message}</p>
          </div>
        </div>
        
      </div>
    );
  };
const Notifications = () => {
  const notifications = [
    {
      id: 1,
      message: "Your post has been liked by John.",
      timestamp: "2h ago",
    },
    {
      id: 2,
      message: "You have a new follower: Sarah.",
      timestamp: "4h ago",
    },
    {
      id: 3,
      message: "Jane has commented on your post.",
      timestamp: "8h ago",
    },
  ];

  return (
    <div className="bg-gradient-to-r py-10 from-purple-400 via-pink-500 to-red-500 flex justify-center w-screen  h-screen">
      <div className="w-1/2">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
            <h2 className="text-white font-medium">Notifications</h2>
          </div>
          <div className="p-4">
            {notifications.map((notification) => (
              <NotificationCard
                username="mudittiwari"
                message={notification.message}
                time={notification.timestamp}
                read={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
