import React from 'react';


const Navbar: React.FC = () => {
    const navigateTo = (path: string) => {
        window.location.href = path;
    };

  return (
    <nav style={navbarStyles}>
      <div style={logoStyles} onClick={() => navigateTo('/')}>Candidate Credibility Rating</div>
      <ul style={navListStyles}>
        <li style={navItemStyles} onClick={() => navigateTo('/')}>Home</li>
        {/* <li style={navItemStyles}>Candidate</li>
        <li style={navItemStyles}>Recruiter</li> */}
        <li style={navItemStyles}>Contact Us</li>
      </ul>
    </nav>
  );
};

const navbarStyles: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
};

const logoStyles: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const navListStyles: React.CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  gap: '20px',
};

const navItemStyles: React.CSSProperties = {
  cursor: 'pointer',
};

export default Navbar;
