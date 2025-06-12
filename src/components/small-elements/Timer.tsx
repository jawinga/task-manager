"use client"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { useEffect } from "react"
import React from "react"
import "react-circular-progressbar/dist/styles.css"

interface TimerProps {
  dueDate?: string
  totalDays?: number
  size?: number
  variant?: "primary" | "success" | "warning" | "danger"
  showGlow?: boolean
  animated?: boolean
}

const Timer = ({
  dueDate,
  totalDays,
  size = 120,
  variant = "primary",
  showGlow = true,
  animated = true,
}: TimerProps) => {
  const [percentage, setPercentage] = React.useState(0)
  const [label, setLabel] = React.useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const due = new Date(dueDate ?? "")
      const diffMsRaw = due.getTime() - now.getTime()

      if (!totalDays) {
        setLabel("No totalDays")
        setPercentage(0)
        return
      }

      const totalMs = totalDays * 24 * 60 * 60 * 1000
      const diffMs = Math.min(Math.max(diffMsRaw, 0), totalMs)

      // Label (time left)
      if (diffMsRaw <= 0) {
        setLabel("Expired")
      } else {
        const secondsLeft = Math.floor(diffMsRaw / 1000)
        const minutesLeft = Math.floor(secondsLeft / 60)
        const hours = Math.floor(minutesLeft / 60)
        const minutes = minutesLeft % 60
        const days = Math.floor(hours / 24)
        const hoursInDay = hours % 24
        const seconds = secondsLeft % 60

        if (days < 1) {
          setLabel(
            `${hoursInDay}:${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`
          )
        } else {
          setLabel(`${days}d ${hoursInDay}:${minutes.toString().padStart(2, "0")}`)
        }
      }

      const pctLeft = (diffMs / totalMs) * 100
      setPercentage(Math.min(Math.max(pctLeft, 0), 100))
    }

    updateTime()
    let interval: number
    const now = new Date()
    const due = new Date(dueDate ?? "")
    const diffMsRaw = due.getTime() - now.getTime()
    if (diffMsRaw > 0 && diffMsRaw < 24 * 60 * 60 * 1000) {
      interval = setInterval(updateTime, 1000)
    } else {
      interval = setInterval(updateTime, 60000)
    }
    return () => clearInterval(interval)
  }, [dueDate, totalDays])

  // Auto-determine variant based on time remaining
  const getAutoVariant = () => {
    if (label === "Expired") return "danger"
    if (percentage < 20) return "danger"
    if (percentage < 50) return "warning"
    if (percentage < 80) return "primary"
    return "success"
  }

  const currentVariant = variant === "primary" ? getAutoVariant() : variant

  const getVariantColors = (variant: string) => {
    switch (variant) {
      case "success":
        return {
          pathColor: "#10B981",
          glowColor: "rgba(16, 185, 129, 0.4)",
          shadowColor: "rgba(16, 185, 129, 0.2)",
        }
      case "warning":
        return {
          pathColor: "#F59E0B",
          glowColor: "rgba(245, 158, 11, 0.4)",
          shadowColor: "rgba(245, 158, 11, 0.2)",
        }
      case "danger":
        return {
          pathColor: "#EF4444",
          glowColor: "rgba(239, 68, 68, 0.4)",
          shadowColor: "rgba(239, 68, 68, 0.2)",
        }
      default:
        return {
          pathColor: "#8A2BE2",
          glowColor: "rgba(138, 43, 226, 0.4)",
          shadowColor: "rgba(138, 43, 226, 0.2)",
        }
    }
  }

  const colors = getVariantColors(currentVariant)

  return (
    <div
      className="enhanced-timer"
      style={
        {
          width: size,
          height: size,
          "--glow-color": colors.glowColor,
          "--shadow-color": colors.shadowColor,
          "--path-color": colors.pathColor,
        } as React.CSSProperties
      }
    >
      <div className="timer-container">
        <CircularProgressbar
          value={percentage}
          text={label}
          styles={buildStyles({
            rotation: 0.25,
            strokeLinecap: "round",
            textSize: size > 100 ? "12px" : "10px",
            pathTransitionDuration: animated ? 1.2 : 0,
            pathColor: colors.pathColor,
            textColor: "#ffffff",
            trailColor: "rgba(255, 255, 255, 0.1)",
            backgroundColor: "transparent",
          })}
        />

        {/* Animated background rings */}
        {animated && (
          <>
            <div className="background-ring ring-1"></div>
            <div className="background-ring ring-2"></div>
            <div className="background-ring ring-3"></div>
          </>
        )}

        {/* Center dot */}
        <div className="center-dot"></div>

        {/* Urgency indicator for expired/critical timers */}
        {(label === "Expired" || percentage < 10) && <div className="urgency-pulse"></div>}
      </div>

      <style>{
      
      
      `
        .enhanced-timer {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 8px 16px var(--shadow-color));
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .enhanced-timer:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 12px 24px var(--shadow-color));
        }

        .enhanced-timer :global(.CircularProgressbar) {
          position: relative;
         z-index: 4;
        }
      .enhanced-timer :global(.CircularProgressbar-text) {
       position: relative;
       z-index: 5;
       font-weight: 700;}


        .timer-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(26, 26, 46, 0.9) 0%, 
            rgba(22, 33, 62, 0.9) 50%, 
            rgba(15, 52, 96, 0.9) 100%
          );
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .timer-container::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: conic-gradient(
            from 0deg,
            var(--path-color),
            transparent 120deg,
            var(--path-color)
          );
          border-radius: 50%;
          z-index: -1;
          animation: ${animated ? "rotate 6s linear infinite" : "none"};
        }

        .background-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.05);
          pointer-events: none;
        }

        .ring-1 {
          top: 10%;
          left: 10%;
          right: 10%;
          bottom: 10%;
          animation: pulse 4s ease-in-out infinite;
        }

        .ring-2 {
          top: 20%;
          left: 20%;
          right: 20%;
          bottom: 20%;
          animation: pulse 4s ease-in-out infinite 1s;
        }

        .ring-3 {
          top: 30%;
          left: 30%;
          right: 30%;
          bottom: 30%;
          animation: pulse 4s ease-in-out infinite 2s;
        }

        .center-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          background: var(--path-color);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px var(--glow-color);
          animation: ${animated ? "glow 4s ease-in-out infinite alternate" : "none"};
          z-index: 2; /* ensure dot is above rings */
        }

        .urgency-pulse {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 2px solid #EF4444;
          border-radius: 50%;
          animation: urgencyPulse 3s ease-in-out infinite;
          z-index: 3; /* above all other elements */
        }

        ${
          showGlow
            ? `
          .enhanced-timer::after {
            content: '';
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%);
            border-radius: 50%;
            z-index: -2;
            opacity: 0.6;
            animation: ${animated ? "breathe 6s ease-in-out infinite" : "none"};
          }
        `
            : ""
        }

        /* Make sure the CircularProgressbar (and especially its text) is on top */
        .enhanced-timer :global(.CircularProgressbar) {
          position: relative;
          z-index: 4;
        }
        .enhanced-timer :global(.CircularProgressbar-text) {
          position: relative;
          z-index: 5;
          font-weight: 700;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.02em;
        }
        .enhanced-timer :global(.CircularProgressbar-path) {
          filter: drop-shadow(0 0 8px var(--glow-color));
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 10px var(--glow-color);
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            box-shadow: 0 0 20px var(--glow-color);
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes breathe {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes urgencyPulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .enhanced-timer:hover {
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  )
}

export default Timer
