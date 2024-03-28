import React, { useState } from 'react';

const NotificationComponent: React.FC = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handleShowNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div>
      <button onClick={handleShowNotification}>Show Notification</button>
      {showNotification && (
        <div style={{ backgroundColor: 'lightblue', padding: '10px', marginTop: '10px' }}>
          This is a notification message!
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
