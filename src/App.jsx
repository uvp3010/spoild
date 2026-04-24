import React, { useState, useEffect } from 'react';

const  App = () => {
  // Set target date to October 30 of current year or next year
  const [targetDate] = useState(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    let targetYear = currentYear;
    
    // If we're past October 30 this year, set to next year
    if (date > new Date(currentYear, 9, 30)) { // Month is 0-indexed, so October is 9
      targetYear = currentYear + 1;
    }
    
    return new Date(targetYear, 9, 30, 23, 59, 59); // October 30 at 11:59:59 PM
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
      const minutes = Math.floor((difference % 3600000) / 60000));
      const seconds = Math.floor((difference % 60000) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  const isTimeUp = targetDate <= new Date();
  
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Poppins', 'Segoe UI', 'Roboto', sans-serif",
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
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
    },
    icon: {
      fontSize: '4rem',
      marginBottom: '20px',
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
      fontSize: '2rem',
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
    autumnLeaves: {
      position: 'absolute',
      fontSize: '2rem',
      opacity: 0.1,
      pointerEvents: 'none',
    },
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>
          {isTimeUp ? '🎃🍂' : '🍁⏰'}
        </div>
        
        <h1 style={styles.title}>
          {isTimeUp ? "🎃 The Wait is Over! 🍂" : "Autumn Time Capsule"}
        </h1>
        
        <p style={styles.subtitle}>
          {isTimeUp 
            ? "October 30th has arrived! Here's your message from the past 🎑" 
            : "A special autumn message is locked away until October 30th..."}
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
            
            <div style={styles.lockIcon}>🍂🔒🍁</div>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              This autumn capsule will open on October 30th
            </p>
            <p style={styles.revealDate}>
              📅 Reveal date: <strong>October 30, {targetDate.getFullYear()}</strong>
              <br />
              🍎 Just in time for Halloween and autumn magic!
            </p>
          </>
        ) : (
          <div style={styles.messageBox}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎃🍂📜🍁🎑</div>
            <div style={styles.secretMessage}>
              ✨ Happy October 30th! ✨
              <br /><br />
              The leaves have fallen, the air is crisp, and the time has finally come.
              <br /><br />
              When you locked this message away, you were waiting for this very moment — a moment of reflection, growth, and discovery.
              <br /><br />
              Whatever has happened in these past months, know that every season brings its own beauty. Like autumn, sometimes we need to let go of old leaves to make room for new growth.
              <br /><br />
              🍂 Embrace the change. Celebrate your journey. Keep moving forward. 🍁
              <br /><br />
              With love, from your past self 💫
            </div>
          </div>
        )}
        
        <div style={styles.footer}>
          🍁 Time Capsule • Revealing on October 30th • {isTimeUp ? "Unlocked" : "Locked"}
        </div>
      </div>
    </div>
  );
};

export default App;
