import React from 'react';
import './SideMenu.css'; // Import the CSS file

const SideMenu: React.FC = () => {
    const staticData = {
        name: 'Dave Jones',
        role: 'CEO',
        sections: ['Section 1', 'Section 2', 'Section 3', 'Section 4'],
      };
    
     
  return (
   
    
        <div className="side-menu">
          {/* Header */}
          <div className="header">
            {/* Content for the header */}
          </div>
    
          {/* Side menu header */}
          <div className="side-menu-header">
            {/* Content for the side menu header */}
          </div>
    
          {/* Avatar & description */}
          <div className="avatar-and-description">
            <div className="avatar">
              {/* Content for the avatar */}
            </div>
            <div className="paragraph-container">
              <div className="name">{staticData.name}</div>
              <div className="role">{staticData.role}</div>
            </div>
          </div>
    
          {/* Dropdown */}
          <div className="dropdown">
            {/* Content for the dropdown */}
          </div>
    
          {/* Sections */}
          <div className="sections">
            {staticData.sections.map((section, index) => (
              <div className="section" key={index}>
                {section}
              </div>
            ))}
          </div>
    
          {/* Section interaction */}
          <div className="section-interaction">
            {/* Content for the section interaction */}
          </div>
    
          {/* Notification Counter */}
          <div className="notification-counter">
            {/* Content for the notification counter */}
          </div>
    
          {/* Arrows */}
          <div className="arrows">
            {/* Content for the arrows */}
          </div>
        </div>

  );
};

export default SideMenu;
