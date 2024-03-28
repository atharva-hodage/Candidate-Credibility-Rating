import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signout = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
          const response = await fetch('/api/v1/signout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          if (response.status === 200) {
         
            Cookies.remove('accessToken');
            localStorage.clear();
            navigate('/loginForm');
          } else {
            
            console.error('Logout failed');
          }
        } else {
          // Handle case when there's no access token in cookies
          console.error('No access token found in cookies');
        }
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    signout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
