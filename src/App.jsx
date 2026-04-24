import { useState, useEffect } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [capsule, setCapsule] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Load saved capsule
  useEffect(() => {
    const saved = localStorage.getItem("timeCapsule");
    if (saved) {
      setCapsule(JSON.parse(saved));
    }
  }, []);

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSeal = () => {
    const sixMonths = 1000 * 60 * 60 * 24 * 30 * 6; // approx 6 months
    const data = {
      message,
      unlockTime: Date.now() + sixMonths,
    };

    localStorage.setItem("timeCapsule", JSON.stringify(data));
    setCapsule(data);
  };

  const isUnlocked =
    capsule && currentTime >= capsule.unlockTime;

  const remainingDays = capsule
    ? Math.ceil(
        (capsule.unlockTime - currentTime) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400 font-mono">
      <div className="w-full max-w-md p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-cyan-400/20 shadow-[0_0_40px_rgba(0,255,255,0.2)]">

        <h1 className="text-2xl text-center tracking-widest mb-4">
          🧬 FUTURE CAPSULE
        </h1>

        {!capsule && (
          <>
            <textarea
              className="w-full p-3 bg-black/50 border border-cyan-400/30 rounded-lg focus:outline-none"
              placeholder="Write a message for your future self..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={handleSeal}
              className="mt-4 w-full py-2 border border-cyan-400 rounded-lg hover:bg-cyan-400/20 transition"
            >
              🔒 Lock for 6 Months
            </button>
          </>
        )}

        {capsule && !isUnlocked && (
          <div className="text-center mt-6">
            <p className="opacity-70">Capsule Locked</p>
            <p className="text-lg mt-2">
              ⏳ Opens in {remainingDays} days
            </p>
          </div>
        )}

        {capsule && isUnlocked && (
          <div className="mt-6 p-4 border border-green-400 rounded-lg bg-green-500/10 text-green-300 animate-fadeIn">
            <p className="mb-2 text-sm">🚀 Message from the Past</p>
            <p className="text-lg break-words">
              {capsule.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
