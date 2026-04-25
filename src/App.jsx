import React, { useEffect, useState } from "react";

const App = () => {
  // 👉 Set your target date here
  const targetDate = new Date("2026-10-25T00:00:00"); // example

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      if (now >= targetDate) {
        setIsUnlocked(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRemainingTime = () => {
    const diff = targetDate - currentTime;

    if (diff <= 0) return "Unlocked 🎉";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⏳ Time Capsule</h1>

      {!isUnlocked ? (
        <>
          <p style={styles.text}>This message will unlock in:</p>
          <h2 style={styles.timer}>{getRemainingTime()}</h2>
        </>
      ) : (
        <div style={styles.messageBox}>
          <h2>🚀 Message Unlocked</h2>
          <p>
            "Hey future you — whatever you're doing right now, I hope it was worth the wait."
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "#fff",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  text: {
    fontSize: "1.2rem",
  },
  timer: {
    fontSize: "2rem",
    marginTop: "10px",
  },
  messageBox: {
    padding: "20px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    textAlign: "center",
  },
};

export default App;
