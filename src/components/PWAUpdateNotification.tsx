import React, { useState, useEffect } from 'react';
import './PWAUpdateNotification.scss';

interface PWAUpdateNotificationProps {
  className?: string;
}

const PWAUpdateNotification: React.FC<PWAUpdateNotificationProps> = ({ className }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    const handleUpdateAvailable = (event: Event) => {
      const customEvent = event as CustomEvent<{ registration: ServiceWorkerRegistration }>;
      const registration = customEvent.detail.registration;
      
      if (registration && registration.waiting) {
        setWaitingWorker(registration.waiting);
        setShowUpdate(true);
      }
    };

    window.addEventListener('pwa-update-available', handleUpdateAvailable);

    // Also listen for service worker updates directly
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker);
                setShowUpdate(true);
              }
            });
          }
        });
      });
    }

    return () => {
      window.removeEventListener('pwa-update-available', handleUpdateAvailable);
    };
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdate(false);
      window.location.reload();
    }
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  if (!showUpdate) return null;

  return (
    <div className={className || 'pwa-update-notification'}>
      <div className="notification-content">
        <span className="notification-message">
          ✨ New version available! Update for the best experience.
        </span>
        <div className="notification-actions">
          <button onClick={handleUpdate} className="update-button">
            Update Now
          </button>
          <button onClick={handleDismiss} className="dismiss-button">
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAUpdateNotification;