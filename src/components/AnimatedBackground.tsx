import React, { useEffect, useRef } from "react";

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracker
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Particle types: Spores/Pollen, Dew Droplets, Floating Seeds, Leaf Outlines
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      type: "spore" | "leaf" | "seed" | "droplet" | "bioNode";
      opacity: number;
      baseOpacity: number;
      angle: number;
      rotationSpeed: number;
      hue: number;
      pulseSpeed: number;
      pulseOffset: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);

    const particleTypes: Particle["type"][] = [
      "spore",
      "spore",
      "leaf",
      "seed",
      "droplet",
      "bioNode",
      "leaf",
    ];

    for (let i = 0; i < particleCount; i++) {
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      const baseOpacity = Math.random() * 0.4 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35 + 0.1, // gentle drift
        vy: (Math.random() - 0.5) * 0.3 - 0.15, // slight upward float
        size:
          type === "leaf"
            ? Math.random() * 12 + 10
            : type === "seed"
            ? Math.random() * 8 + 6
            : Math.random() * 3 + 1.5,
        type,
        opacity: baseOpacity,
        baseOpacity,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        hue: Math.random() > 0.3 ? 155 : 45, // Emerald green (155) or Amber (45)
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Helper to draw a delicate floating leaf outline
    const drawLeaf = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      opacity: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.strokeStyle = `rgba(52, 211, 153, ${opacity * 0.7})`;
      c.fillStyle = `rgba(16, 185, 129, ${opacity * 0.15})`;
      c.lineWidth = 1.2;

      c.beginPath();
      c.moveTo(0, -size);
      c.bezierCurveTo(size * 0.7, -size * 0.4, size * 0.7, size * 0.4, 0, size);
      c.bezierCurveTo(-size * 0.7, size * 0.4, -size * 0.7, -size * 0.4, 0, -size);
      c.closePath();
      c.fill();
      c.stroke();

      // Leaf central vein
      c.beginPath();
      c.moveTo(0, -size * 0.85);
      c.lineTo(0, size * 0.85);
      c.strokeStyle = `rgba(167, 243, 208, ${opacity * 0.5})`;
      c.lineWidth = 0.8;
      c.stroke();

      c.restore();
    };

    // Helper to draw a floating seed / sprout icon
    const drawSeed = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      opacity: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.strokeStyle = `rgba(251, 191, 36, ${opacity * 0.65})`;
      c.lineWidth = 1;

      // Seed pod
      c.beginPath();
      c.ellipse(0, 0, size * 0.4, size * 0.7, 0, 0, Math.PI * 2);
      c.fillStyle = `rgba(217, 119, 6, ${opacity * 0.2})`;
      c.fill();
      c.stroke();

      // Tiny sprout
      c.beginPath();
      c.moveTo(0, -size * 0.7);
      c.quadraticCurveTo(size * 0.5, -size * 1.1, size * 0.7, -size * 0.9);
      c.strokeStyle = `rgba(52, 211, 153, ${opacity * 0.8})`;
      c.stroke();

      c.restore();
    };

    // Animation Loop
    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Connect nearby bioNodes/spores with subtle mycorrhizal mycelium glowing lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineOpacity = (1 - dist / 110) * 0.12 * Math.min(particles[i].opacity, particles[j].opacity);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(52, 211, 153, ${lineOpacity})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic swaying movement (sine waves)
        p.x += p.vx + Math.sin(time + p.pulseOffset) * 0.35;
        p.y += p.vy + Math.cos(time + p.pulseOffset) * 0.25;
        p.angle += p.rotationSpeed;

        // Breathing opacity
        p.opacity = p.baseOpacity + Math.sin(time * p.pulseSpeed * 10 + p.pulseOffset) * 0.08;

        // Mouse interactive gentle repulsion / glow
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 1.5;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
          p.opacity = Math.min(p.opacity + 0.3, 0.9);
        }

        // Screen wrap-around
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;
        if (p.y < -30) p.y = height + 20;
        if (p.y > height + 30) p.y = -20;

        // Draw particle based on type
        if (p.type === "leaf") {
          drawLeaf(ctx, p.x, p.y, p.size, p.angle, p.opacity);
        } else if (p.type === "seed") {
          drawSeed(ctx, p.x, p.y, p.size, p.angle, p.opacity);
        } else if (p.type === "droplet") {
          // Luminous water droplet
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity * 0.6})`;
          ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Glowing Spore or BioNode
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          const color =
            p.hue === 155
              ? `rgba(52, 211, 153, ${p.opacity})`
              : `rgba(251, 191, 36, ${p.opacity})`;
          ctx.fillStyle = color;
          ctx.shadowColor =
            p.hue === 155
              ? "rgba(16, 185, 129, 0.6)"
              : "rgba(245, 158, 11, 0.6)";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* 1. Base Luminous Canvas */}
      <div className="absolute inset-0 bg-[#f8fafc]" />

      {/* 2. Slow Animated Ambient Radial Orbs in Fresh Lime, Emerald & Soft Amber */}
      <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] bg-lime-400/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: "9s" }} />
      <div className="absolute top-[25%] right-[-15%] w-[700px] h-[700px] bg-emerald-400/10 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute top-[55%] left-[-12%] w-[600px] h-[600px] bg-amber-300/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: "14s" }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[650px] h-[650px] bg-lime-500/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: "10s" }} />

      {/* 3. Subtle Animated Agricultural Grid / Topographic Waves */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(101, 163, 13, 0.6) 1px, transparent 1px),
            linear-gradient(to right, rgba(15, 23, 42, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 80px 80px, 80px 80px",
        }}
      />

      {/* 4. Large Floating Botanical Outline Drawings in Background with CSS animation */}
      <svg
        className="absolute top-[12%] right-[5%] w-[380px] h-[380px] text-emerald-600/[0.04] animate-spin"
        style={{ animationDuration: "120s" }}
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M100 10 C140 40 180 80 180 130 C180 170 140 190 100 190 C60 190 20 170 20 130 C20 80 60 40 100 10 Z" />
        <path d="M100 10 L100 190" />
        <path d="M100 60 Q140 80 160 110" />
        <path d="M100 90 Q60 110 40 140" />
        <path d="M100 120 Q140 140 155 165" />
      </svg>

      <svg
        className="absolute top-[48%] left-[2%] w-[420px] h-[420px] text-teal-600/[0.035] animate-pulse"
        style={{ animationDuration: "16s" }}
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <circle cx="100" cy="100" r="80" strokeDasharray="4 8" />
        <circle cx="100" cy="100" r="55" />
        <path d="M100 20 L100 180 M20 100 L180 100" strokeDasharray="2 6" />
        <path d="M70 70 L130 130 M70 130 L130 70" />
      </svg>

      <svg
        className="absolute bottom-[8%] left-[25%] w-[480px] h-[480px] text-lime-600/[0.03] animate-spin"
        style={{ animationDuration: "180s", animationDirection: "reverse" }}
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M 50 100 Q 100 30 150 100 T 250 100" />
        <path d="M 50 120 Q 100 50 150 120 T 250 120" />
        <circle cx="100" cy="100" r="40" />
      </svg>

      {/* 5. Interactive Particle & Living Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
