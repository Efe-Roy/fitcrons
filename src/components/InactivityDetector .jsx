import { useState, useEffect } from 'react';

const InactivityDetector = ({ onLogout }) => {
  // Define the inactivity timeout in milliseconds (adjust as needed)
  const inactivityTimeout = 300000; // 5 minutes
  let inactivityTimer;

  // Function to reset the inactivity timer
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(onLogout, inactivityTimeout);
  };

  // Effect hook to set up event listeners and handle cleanup
  useEffect(() => {
    // Event listeners for mouse movement and keyboard input
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);

    // Initial setup of the inactivity timer
    resetInactivityTimer();

    // Cleanup: Remove event listeners and clear the timer
    return () => {
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      clearTimeout(inactivityTimer);
    };
  }, [onLogout]);

  // This component doesn't render anything in the UI
  return <></>;
};

export default InactivityDetector;
