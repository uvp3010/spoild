import React, { useState, useEffect } from 'react';

const TimeCapsulePage = () => {
  // Set target date: 6 months from now
  const [targetDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 6);
    return date;
  });
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference <= 0) {
        // Time's up! Message can be displayed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (86400000)) / (3600000));
      const minutes = Math.floor((difference % 3600000) / 60000);
      const seconds = Math.floor((difference % 60000) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  const isTimeUp = targetDate <= new Date();
  
  // Beautiful gradient backgrounds
  const getGradient = () => {
    if (isTimeUp) {
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };
  
  const styles = {
    container: {
      minHeight: '100vh',
      background: getGradient(),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Poppins', 'Segoe UI', 'Roboto', sans-serif",
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    },
    containerBefore: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      opacity: 0.1,
      pointerEvents: 'none',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '30px',
      padding: '50px 40px',
      maxWidth: '600px',
      width: '100%',
      textAlign: 'center',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      zIndex: 1,
      transition: 'transform 0.3s ease',
    },
    icon: {
      fontSize: '4rem',
      marginBottom: '20px',
      animation: isTimeUp ? 'bounce 1s ease infinite' : 'none',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '15px',
    },
    subtitle: {
      fontSize: '1rem',
      color: '#6b7280',
      marginBottom: '40px',
      lineHeight: '1.6',
    },
    countdownContainer: {
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      borderRadius: '20px',
      padding: '30px',
      marginBottom: '30px',
    },
    timerWrapper: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    },
    timeBlock: {
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      minWidth: '100px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    timeNumber: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: 1,
    },
    timeLabel: {
      fontSize: '0.8rem',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginTop: '10px',
    },
    messageBox: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '20px',
      padding: '30px',
      color: 'white',
      marginTop: '20px',
    },
    secretMessage: {
      fontSize: '1.2rem',
      lineHeight: '1.8',
      marginBottom: '15px',
    },
    lockIcon: {
      marginBottom: '15px',
    },
    revealDate: {
      fontSize: '0.9rem',
      color: '#9ca3af',
      marginTop: '20px',
    },
    footer: {
      marginTop: '30px',
      fontSize: '0.8rem',
      color: '#9ca3af',
    },
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.containerBefore} />
      <div style={styles.card}>
        <div style={styles.icon}>
          {isTimeUp ? '🎉' : '⏰'}
        </div>
        
        <h1 style={styles.title}>
          {isTimeUp ? "It's Time!" : "Time Capsule"}
        </h1>
        
        <p style={styles.subtitle}>
          {isTimeUp 
            ? "Your wait is over! Here's your message from the past ✨" 
            : "A special message is locked away, waiting for the right moment..."}
        </p>
        
        {!isTimeUp ? (
          <>
            <div style={styles.countdownContainer}>
              <div style={styles.timerWrapper}>
                <div style={styles.timeBlock}>
                  <div style={styles.timeNumber}>{String(timeLeft.days).padStart(2, '0')}</div>
                  <div style={styles.timeLabel}>Days</div>
                </div>
                <div style={styles.timeBlock}>
                  <div style={styles.timeNumber}>{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div style={styles.timeLabel}>Hours</div>
                </div>
                <div style={styles.timeBlock}>
                  <div style={styles.timeNumber}>{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div style={styles.timeLabel}>Minutes</div>
                </div>
                <div style={styles.timeBlock}>
                  <div style={styles.timeNumber}>{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div style={styles.timeLabel}>Seconds</div>
                </div>
              </div>
            </div>
            
            <div style={styles.lockIcon}>🔒</div>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              This capsule will open automatically after the timer reaches zero
            </p>
            <p style={styles.revealDate}>
              📅 Reveal date: {targetDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </>
        ) : (
          <div style={styles.messageBox}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📜</div>
            <div style={styles.secretMessage}>
              🎊 Congratulations! 🎊
              <br /><br />
              Six months have passed since you locked this time capsule.
              <br /><br />
              Time flies when you're growing, learning, and becoming the person you're meant to be.
              <br /><br />
              Whatever brought you here today — a goal, a dream, a memory — remember that every moment matters.
              <br /><br />
              Keep looking forward, but never forget how far you've come.
              <br /><br />
              🌟 The future is bright! 🌟
            </div>
          </div>
        )}
        
        <div style={styles.footer}>
          ⚡ Time Capsule • {isTimeUp ? "Unlocked" : "Locked for 6 months"}
        </div>
      </div>
      
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        `}
      </style>
    </div>
  );
};

export default TimeCapsulePage;
