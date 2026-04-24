import { useState, useEffect } from "react";
import "./App.css"; // We'll define the styles below

export default function TimeCapsule() {
  const [message, setMessage] = useState("");
  const [capsule, setCapsule] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState([]);

  // Load saved capsule
  useEffect(() => {
    const saved = localStorage.getItem("stellarCapsule");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCapsule(parsed);
      // Trigger unlock effect if already unlocked
      if (parsed.unlockTime <= Date.now()) {
        setShowConfetti(true);
        generateParticles();
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }
  }, []);

  // Live clock & unlock check
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);
      // Check for just-unlocked moment
      if (capsule && !showConfetti && now >= capsule.unlockTime && capsule.unlockTime - now < 2000) {
        setShowConfetti(true);
        generateParticles();
        setTimeout(() => setShowConfetti(false), 4500);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [capsule, showConfetti]);

  const generateParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 1.5,
        size: 4 + Math.random() * 8
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 4000);
  };

  const handleSeal = () => {
    if (!message.trim()) {
      // subtle shake feedback
      const textarea = document.querySelector(".message-input");
      textarea?.classList.add("shake");
      setTimeout(() => textarea?.classList.remove("shake"), 500);
      return;
    }
    const sixMonthsMs = 1000 * 60 * 60 * 24 * 180; // exactly 6 months
    const data = {
      message: message.trim(),
      unlockTime: Date.now() + sixMonthsMs,
      createdAt: Date.now(),
    };
    localStorage.setItem("stellarCapsule", JSON.stringify(data));
    setCapsule(data);
    // Play seal haptic / visual feedback
    const btn = document.querySelector(".seal-btn");
    btn?.classList.add("btn-flash");
    setTimeout(() => btn?.classList.remove("btn-flash"), 300);
  };

  const isUnlocked = capsule && currentTime >= capsule.unlockTime;
  const remainingMs = capsule ? capsule.unlockTime - currentTime : 0;
  const remainingDays = Math.max(0, Math.ceil(remainingMs / (1000 * 60 * 60 * 24)));
  const remainingHours = Math.max(0, Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const remainingMins = Math.max(0, Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60)));
  const remainingSecs = Math.max(0, Math.floor((remainingMs % (1000 * 60)) / 1000));

  // Progress percentage for timer ring
  const totalDuration = capsule ? 180 * 24 * 60 * 60 * 1000 : 1;
  const elapsed = capsule ? currentTime - capsule.createdAt : 0;
  const progress = capsule ? Math.min(100, Math.max(0, (elapsed / totalDuration) * 100)) : 0;

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleReset = () => {
    if (window.confirm("✨ Destroy current capsule and create a new one? ✨")) {
      localStorage.removeItem("stellarCapsule");
      setCapsule(null);
      setMessage("");
      setShowConfetti(false);
      setParticles([]);
    }
  };

  return (
    <div className="cosmic-wrapper">
      {/* animated stars background */}
      <div className="star-field"></div>
      <div className="star-field second-layer"></div>

      {/* floating particles when unlocked */}
      {showConfetti && (
        <div className="particle-burst">
          {particles.map(p => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: `${p.left}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          ))}
        </div>
      )}

      <div className="capsule-card">
        {/* holographic edge glow */}
        <div className="card-glow"></div>

        <div className="capsule-header">
          <div className="icon-symbol">✦ TIME VAULT ✦</div>
          <div className="subtitle">encrypted for your future self</div>
        </div>

        {!capsule ? (
          <div className="create-section">
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">📜</span> your message to tomorrow
              </label>
              <textarea
                className="message-input"
                placeholder="Write something only you will understand... dreams, secrets, hopes, or warnings..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={800}
                rows={5}
              />
              <div className="char-counter">{message.length}/800</div>
            </div>

            <button className="seal-btn" onClick={handleSeal}>
              <span className="btn-content">
                <span className="btn-icon">🔒</span> SEAL CAPSULE — 6 MONTHS
              </span>
              <span className="btn-glow"></span>
            </button>
            <p className="info-note">⏳ time-locked until <strong>{new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</strong></p>
          </div>
        ) : (
          <div className="capsule-status">
            {!isUnlocked ? (
              <div className="locked-panel">
                <div className="lock-icon pulse-lock">🔒</div>
                <h3>⚡ temporal lock active ⚡</h3>
                <div className="countdown-ring">
                  <svg className="progress-ring" width="140" height="140" viewBox="0 0 140 140">
                    <circle
                      className="progress-bg"
                      cx="70"
                      cy="70"
                      r="62"
                      stroke="rgba(0, 255, 255, 0.2)"
                      strokeWidth="5"
                      fill="none"
                    />
                    <circle
                      className="progress-fill"
                      cx="70"
                      cy="70"
                      r="62"
                      stroke="url(#gradient)"
                      strokeWidth="5"
                      fill="none"
                      strokeDasharray="389.5"
                      strokeDashoffset={389.5 - (progress / 100) * 389.5}
                      strokeLinecap="round"
                      transform="rotate(-90 70 70)"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f2fe" />
                        <stop offset="100%" stopColor="#4facfe" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="countdown-text">
                    <span className="days-num">{remainingDays}</span>
                    <span className="days-label">days</span>
                    <div className="sub-time">
                      {remainingHours}h : {remainingMins}m : {remainingSecs}s
                    </div>
                  </div>
                </div>
                <div className="unlock-info">
                  <div className="info-row">
                    <span>📅 unlock date</span>
                    <span>{formatDate(capsule.unlockTime)}</span>
                  </div>
                  <div className="info-row">
                    <span>⏱️ sealed on</span>
                    <span>{formatDate(capsule.createdAt)}</span>
                  </div>
                </div>
                <div className="capsule-message-preview">
                  <p className="preview-title">𓋴 sealed content</p>
                  <div className="blur-message">{capsule.message.length > 50 ? capsule.message.substring(0, 50) + "..." : capsule.message}</div>
                  <div className="lock-overlay">🔐 time-locked</div>
                </div>
                <button className="reset-btn subtle" onClick={handleReset}>
                  🕳️ destroy capsule & restart
                </button>
              </div>
            ) : (
              <div className="unlocked-unveil">
                <div className="glow-intense"></div>
                <div className="unlock-badge">
                  <span className="badge-icon">✨🔓✨</span>
                  <span>CAPSULE OPENED</span>
                </div>
                <div className="future-message">
                  <div className="message-ornament">⌇ past you → current you ⌇</div>
                  <div className="unlocked-text">{capsule.message}</div>
                  <div className="echo-signature">— time capsule, {formatDate(capsule.createdAt)}</div>
                </div>
                <div className="action-buttons">
                  <button className="share-btn" onClick={() => {
                    navigator.clipboard?.writeText(capsule.message);
                    alert("📋 message copied to clipboard");
                  }}>
                    📋 copy memory
                  </button>
                  <button className="reset-btn" onClick={handleReset}>
                    🌌 compose new capsule
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="footer-note">
          <span>◈ encrypted in local memory ◈</span>
        </div>
      </div>
    </div>
  );
}
