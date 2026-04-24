import React, { useState, useEffect } from 'react';

const App= () => {
  // Set the lock date: 6 months from when the page first loads
  const [lockDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 6);
    return date;
  });
  
  const [timeLeft, setTimeLeft] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [capsuleMessage, setCapsuleMessage] = useState('');
  
  // Replace this with your secret message
  const SECRET_MESSAGE = "🎉 Congratulations! 🎉\n\nSix months have passed since you locked this time capsule.\n\nThis is your message from the past. Whatever goal, hope, or memory you left here, remember how far you've come. The future is bright! 🌟";
  
  useEffect(() => {
    // Check if already unlocked in localStorage
    const storedUnlock = localStorage.getItem('timeCapsuleUnlocked');
    const storedMessage = localStorage.getItem('timeCapsuleMessage');
    
    if (storedUnlock === 'true' && storedMessage) {
      setIsUnlocked(true);
      setCapsuleMessage(storedMessage);
      setTimeLeft(null);
      return;
    }
    
    // Check if current date is past lock date
    const now = new Date();
    if (now >= lockDate) {
      // Unlock the capsule
      setIsUnlocked(true);
      setCapsuleMessage(SECRET_MESSAGE);
      localStorage.setItem('timeCapsuleUnlocked', 'true');
      localStorage.setItem('timeCapsuleMessage', SECRET_MESSAGE);
      setTimeLeft(null);
    } else {
      // Calculate remaining time
      const diff = lockDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (86400000)) / (3600000));
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }
  }, [lockDate]);
  
  // Update countdown every second
  useEffect(() => {
    if (!isUnlocked && timeLeft) {
      const timer = setInterval(() => {
        const now = new Date();
        if (now >= lockDate) {
          setIsUnlocked(true);
          setCapsuleMessage(SECRET_MESSAGE);
          localStorage.setItem('timeCapsuleUnlocked', 'true');
          localStorage.setItem('timeCapsuleMessage', SECRET_MESSAGE);
          setTimeLeft(null);
          clearInterval(timer);
        } else {
          const diff = lockDate - now;
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (86400000)) / (3600000));
          const minutes = Math.floor((diff % 3600000) / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          setTimeLeft({ days, hours, minutes, seconds });
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isUnlocked, lockDate, SECRET_MESSAGE]);
  
  // Style constants
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      padding: '40px',
      maxWidth: '500px',
      width: '100%',
      textAlign: 'center',
    },
    title: {
      fontSize: '2.5rem',
      color: '#333',
      marginBottom: '10px',
    },
    subtitle: {
      color: '#666',
      marginBottom: '30px',
    },
    qrSection: {
      margin: '30px 0',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '15px',
    },
    qrLabel: {
      fontSize: '0.9rem',
      color: '#888',
      marginBottom: '15px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    qrImage: {
      maxWidth: '200px',
      height: 'auto',
      margin: '0 auto',
      display: 'block',
      borderRadius: '10px',
    },
    countdown: {
      marginTop: '30px',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '15px',
    },
    timer: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '20px',
      gap: '10px',
      flexWrap: 'wrap',
    },
    timerBlock: {
      textAlign: 'center',
      minWidth: '70px',
    },
    timerNumber: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#667eea',
    },
    timerLabel: {
      fontSize: '0.8rem',
      color: '#888',
      textTransform: 'uppercase',
    },
    lockedMessage: {
      color: '#999',
      fontStyle: 'italic',
      marginTop: '20px',
    },
    unlockedMessage: {
      marginTop: '30px',
      padding: '25px',
      backgroundColor: '#e8f5e9',
      borderRadius: '15px',
      borderLeft: '5px solid #4caf50',
    },
    secretMessage: {
      fontSize: '1.2rem',
      lineHeight: '1.6',
      color: '#2e7d32',
      whiteSpace: 'pre-wrap',
      fontFamily: 'inherit',
    },
    celebration: {
      fontSize: '3rem',
      marginBottom: '15px',
    },
    footer: {
      marginTop: '30px',
      fontSize: '0.8rem',
      color: '#aaa',
    },
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>⏳ Time Capsule</h1>
        <p style={styles.subtitle}>A message from the past, waiting for the right moment</p>
        
        {/* QR Code Section - Place your QR code image here */}
        <div style={styles.qrSection}>
          <div style={styles.qrLabel}>🔗 Scan to visit this capsule</div>
          {/* 
            REPLACE THIS WITH YOUR OWN QR CODE IMAGE
            Remove the placeholder div and uncomment the img tag below
            Add your QR code image file to the public folder or use a URL
          */}
          <div style={{ textAlign: 'center' }}>
            {/* <img 
              src="/your-qr-code.png" 
              alt="Time Capsule QR Code" 
              style={styles.qrImage}
            /> */}
            {/* Placeholder - Replace with your actual QR code image */}
            <div style={{
              ...styles.qrImage,
              backgroundColor: '#333',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              width: '200px',
              height: '200px',
            }}>
              YOUR QR CODE<br/>IMAGE HERE
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>
            Share this QR code so others can leave or view messages
          </p>
        </div>
        
        {!isUnlocked ? (
          // Locked state - show countdown
          <div style={styles.countdown}>
            <h3>🔒 Capsule Locked</h3>
            <p>This time capsule will open in:</p>
            {timeLeft && (
              <div style={styles.timer}>
                <div style={styles.timerBlock}>
                  <div style={styles.timerNumber}>{timeLeft.days}</div>
                  <div style={styles.timerLabel}>Days</div>
                </div>
                <div style={styles.timerBlock}>
                  <div style={styles.timerNumber}>{timeLeft.hours}</div>
                  <div style={styles.timerLabel}>Hours</div>
                </div>
                <div style={styles.timerBlock}>
                  <div style={styles.timerNumber}>{timeLeft.minutes}</div>
                  <div style={styles.timerLabel}>Mins</div>
                </div>
                <div style={styles.timerBlock}>
                  <div style={styles.timerNumber}>{timeLeft.seconds}</div>
                  <div style={styles.timerLabel}>Secs</div>
                </div>
              </div>
            )}
            <p style={styles.lockedMessage}>
              💭 A secret message is waiting for you inside...
            </p>
            <p style={{ fontSize: '0.8rem', marginTop: '15px', color: '#999' }}>
              The capsule will open automatically on <strong>{lockDate.toLocaleDateString()}</strong>
            </p>
          </div>
        ) : (
          // Unlocked state - show the secret message
          <div style={styles.unlockedMessage}>
            <div style={styles.celebration}>🎉🔓</div>
            <h3 style={{ color: '#2e7d32', marginBottom: '15px' }}>
              The Time Capsule Has Opened!
            </h3>
            <div style={styles.secretMessage}>
              {capsuleMessage}
            </div>
            <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#555' }}>
              ⏰ This message was locked away for 6 months. Today is the day it was meant to be read.
            </p>
          </div>
        )}
        
        <div style={styles.footer}>
          ⏰ Time Capsule • Messages locked for 6 months
        </div>
      </div>
    </div>
  );
};

export default App;
