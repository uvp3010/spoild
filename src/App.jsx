import { useState, useEffect } from "react";

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
      if (capsule && !showConfetti && now >= capsule.unlockTime && now - capsule.unlockTime < 2000) {
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
      const textarea = document.querySelector(".message-input");
      textarea?.classList.add("shake");
      setTimeout(() => textarea?.classList.remove("shake"), 500);
      return;
    }
    const sixMonthsMs = 1000 * 60 * 60 * 24 * 180;
    const data = {
      message: message.trim(),
      unlockTime: Date.now() + sixMonthsMs,
      createdAt: Date.now(),
    };
    localStorage.setItem("stellarCapsule", JSON.stringify(data));
    setCapsule(data);
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

  const handleCopy = () => {
    if (capsule?.message) {
      navigator.clipboard?.writeText(capsule.message);
      alert("📋 Message copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#0a0c18] via-[#05070f] to-black">
      {/* Animated Starfield Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_15%_30%,rgba(255,255,200,0.8),transparent),radial-gradient(1px_1px_at_73%_85%,rgba(180,220,255,0.9),transparent),radial-gradient(3px_2px_at_45%_55%,rgba(255,200,150,0.6),transparent),radial-gradient(1px_1px_at_92%_12%,rgba(100,255,240,0.7),transparent)] opacity-70 animate-[starMove_80s_linear_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_64%_22%,rgba(255,215,0,0.6),transparent),radial-gradient(2px_2px_at_95%_48%,rgba(0,255,200,0.5),transparent)] opacity-50 animate-[starDrift_120s_linear_infinite_reverse] scale-110" />
      </div>

      {/* Particle Burst Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map(p => (
            <div
              key={p.id}
              className="absolute bottom-0 rounded-full bg-gradient-to-r from-cyan-400 via-yellow-400 to-pink-500 animate-[floatUp_linear_forwards]"
              style={{
                left: `${p.left}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                filter: "blur(1px)",
                boxShadow: "0 0 8px cyan"
              }}
            />
          ))}
        </div>
      )}

      {/* Main Capsule Card */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl border border-cyan-400/30 shadow-[0_25px_45px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,255,255,0.1)_inset,0_0_20px_rgba(0,200,255,0.2)] p-5 md:p-6 transition-all duration-300 z-10">
        {/* Holographic Edge Glow */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-500/20 opacity-40 blur-xl" />
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-teal-400 to-blue-400 bg-clip-text text-transparent tracking-wider">
            ✦ TIME VAULT ✦
          </h1>
          <p className="text-xs text-cyan-300/60 uppercase tracking-[0.2em] mt-2">encrypted for your future self</p>
        </div>

        {!capsule ? (
          /* Create Capsule Section */
          <div className="animate-fadeInUp">
            <div className="mb-5">
              <label className="flex items-center gap-2 text-sm text-cyan-300 font-medium mb-2">
                <span className="text-lg">📜</span> your message to tomorrow
              </label>
              <textarea
                className="message-input w-full bg-black/50 border-2 border-cyan-400/30 rounded-2xl p-4 text-cyan-100 font-mono text-sm resize-none focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_18px_rgba(0,255,200,0.3)] transition-all placeholder:text-gray-500"
                placeholder="Write something only you will understand... dreams, secrets, hopes, or warnings for your future self..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={800}
                rows={5}
              />
              <div className="text-right text-xs text-teal-400/70 mt-1">{message.length}/800</div>
            </div>

            <button
              className="seal-btn relative w-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400 rounded-full py-3 px-4 cursor-pointer overflow-hidden group transition-all hover:bg-cyan-500/30 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(0,255,200,0.4)]"
              onClick={handleSeal}
            >
              <span className="flex items-center justify-center gap-2 text-cyan-300 font-bold tracking-wide">
                <span className="text-xl">🔒</span> SEAL CAPSULE — 6 MONTHS
              </span>
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent transition-all duration-500 group-hover:left-full" />
            </button>
            
            <p className="text-center text-xs text-cyan-400/60 mt-3">
              ⏳ unlocks on <strong className="text-cyan-300">{new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
            </p>
          </div>
        ) : (
          /* Capsule Status Section */
          <div className="animate-fadeIn">
            {!isUnlocked ? (
              /* Locked State */
              <div className="text-center">
                <div className="animate-pulse text-6xl mb-2">🔒</div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-4">⚡ temporal lock active ⚡</h3>
                
                {/* Progress Ring */}
                <div className="relative w-36 h-36 mx-auto mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="62" stroke="rgba(0, 255, 255, 0.15)" strokeWidth="6" fill="none" />
                    <circle
                      cx="70"
                      cy="70"
                      r="62"
                      stroke="url(#gradient)"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="389.5"
                      strokeDashoffset={389.5 - (progress / 100) * 389.5}
                      strokeLinecap="round"
                      className="transition-all duration-300 drop-shadow-[0_0_5px_cyan]"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f2fe" />
                        <stop offset="100%" stopColor="#4facfe" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">{remainingDays}</span>
                    <span className="text-xs text-cyan-300/80">days</span>
                    <span className="text-[11px] font-mono text-teal-300/70 mt-1">{remainingHours}h {remainingMins}m</span>
                  </div>
                </div>

                {/* Info Cards */}
                <div className="bg-black/40 rounded-xl p-3 mb-4 text-xs border border-cyan-400/20">
                  <div className="flex justify-between mb-2">
                    <span className="text-cyan-300/70">📅 unlock date</span>
                    <span className="text-cyan-200 font-mono">{formatDate(capsule.unlockTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300/70">⏱️ sealed on</span>
                    <span className="text-cyan-200 font-mono">{formatDate(capsule.createdAt)}</span>
                  </div>
                </div>

                {/* Blurred Preview */}
                <div className="relative bg-black/30 rounded-xl p-3 border border-dashed border-cyan-400/30 mb-4">
                  <p className="text-[10px] uppercase tracking-wider text-cyan-400/60 mb-1">𓋴 sealed content</p>
                  <div className="blur-md text-sm text-cyan-100/50 select-none">
                    {capsule.message.length > 60 ? capsule.message.substring(0, 60) + "..." : capsule.message}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cyan-300">🔐 time-locked</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="text-xs text-rose-400/70 border border-rose-400/30 rounded-full px-4 py-2 hover:bg-rose-500/10 transition-all"
                >
                  🕳️ destroy capsule & restart
                </button>
              </div>
            ) : (
              /* Unlocked State - The Reveal */
              <div className="text-center relative animate-scalePop">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl rounded-2xl -z-10" />
                
                <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400 rounded-full px-4 py-1.5 mb-5">
                  <span className="text-xl animate-bounce">✨🔓✨</span>
                  <span className="text-xs font-bold text-cyan-200 uppercase tracking-wider">CAPSULE OPENED</span>
                </div>

                <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-5 border border-cyan-400/50 shadow-[0_0_30px_rgba(0,255,200,0.2)]">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-400 mb-3">⌇ message from the past ⌇</div>
                  <div className="text-base md:text-lg leading-relaxed text-cyan-50 font-mono whitespace-pre-wrap break-words">
                    {capsule.message}
                  </div>
                  <div className="mt-4 pt-3 border-t border-cyan-400/30 text-[10px] text-teal-400/60">
                    — sealed on {formatDate(capsule.createdAt)} —
                  </div>
                </div>

                <div className="flex gap-3 justify-center mt-5">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 bg-transparent border border-cyan-400/50 rounded-full px-4 py-2 text-xs text-cyan-300 hover:bg-cyan-500/20 transition-all"
                  >
                    📋 copy message
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 bg-transparent border border-purple-400/50 rounded-full px-4 py-2 text-xs text-purple-300 hover:bg-purple-500/20 transition-all"
                  >
                    🌌 create new capsule
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 pt-3 text-center border-t border-cyan-400/20">
          <p className="text-[10px] text-cyan-400/40 tracking-wider">◈ encrypted in browser memory ◈</p>
        </div>
      </div>

      <style>{`
        @keyframes starMove {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-200px) translateX(50px); }
        }
        @keyframes starDrift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-80px, -150px) scale(1.1); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-120vh) rotate(540deg); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scalePop {
          0% { opacity: 0; transform: scale(0.9) translateY(15px); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-scalePop {
          animation: scalePop 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .shake {
          animation: shakeAnim 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes shakeAnim {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .btn-flash {
          animation: btnFlash 0.2s ease;
        }
        @keyframes btnFlash {
          0% { box-shadow: 0 0 0 0 cyan; border-color: cyan; background: rgba(0,255,255,0.3); }
          100% { box-shadow: 0 0 20px cyan; }
        }
      `}</style>
    </div>
  );
}
