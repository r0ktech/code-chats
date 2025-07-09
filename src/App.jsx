import React, { useState, useEffect, useRef } from "react";
import {
  Code,
  Users,
  Rocket,
  Zap,
  Github,
  Twitter,
  MessageCircle,
} from "lucide-react";

const ParticleSystem = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particleCount = 80;
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 60 + 180, // Blue to cyan range
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsl(${particle.hue}, 70%, 60%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections
        particlesRef.current.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.save();
              ctx.globalAlpha = ((100 - distance) / 100) * 0.1;
              ctx.strokeStyle = `hsl(${particle.hue}, 70%, 60%)`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative group transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className="relative bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-cyan-400 to-purple-400 p-3 rounded-lg mr-4">
            <Icon className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const GlowButton = ({
  children,
  primary = false,
  onClick,
  href,
  className = "",
}) => {
  const Component = href ? "a" : "button";
  const props = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick };

  return (
    <Component
      {...props}
      className={`relative group px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-block text-center ${
        primary
          ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-black hover:from-cyan-400 hover:to-purple-400"
          : "bg-transparent border-2 border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:text-white hover:bg-cyan-400/10"
      } ${className}`}
    >
      <div
        className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-300 ${
          primary
            ? "bg-gradient-to-r from-cyan-500 to-purple-500 opacity-30 group-hover:opacity-50"
            : "bg-cyan-400 opacity-0 group-hover:opacity-20"
        }`}
      ></div>
      <span className="relative z-10">{children}</span>
    </Component>
  );
};

const FuturisticLandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleSystem />

      {/* Background gradients */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div
          className={`flex items-center space-x-2 transform transition-all duration-1000 ${
            isLoaded ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-cyan-400 to-purple-400 p-2 rounded-lg">
            <Code className="w-8 h-8 text-black" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Code.chats
          </span>
        </div>

        <nav
          className={`hidden md:flex space-x-8 transform transition-all duration-1000 delay-200 ${
            isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
        >
          <a
            href="https://chat.whatsapp.com/IKkjqhwk9KuBYkJTr648UL"
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          >
            Community
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          >
            Projects
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          >
            Resources
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          >
            About
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Code The Future
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
            A hub for enthusiastic programmers to learn, collaborate and share
            their skills. Whether you are a seasoned developer or just started
            your coding journey, our community provides a supportive environment
            for knowledge exchange and growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <GlowButton
              primary
              href="https://chat.whatsapp.com/IKkjqhwk9KuBYkJTr648UL"
            >
              Join The Community
            </GlowButton>
            <GlowButton>Explore Projects</GlowButton>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 transform transition-all duration-1000 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">470+</div>
            <div className="text-gray-400">Active Developers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-gray-400">Open Source Projects</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-400 mb-2">24/7</div>
            <div className="text-gray-400">Community Support</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          <FeatureCard
            icon={Users}
            title="Collaborative Learning"
            description="Connect with fellow developers, share knowledge, and grow together in a supportive community environment."
            delay={600}
          />
          <FeatureCard
            icon={Rocket}
            title="Real Projects"
            description="Work on meaningful projects that make a difference. Build your portfolio while contributing to open source."
            delay={700}
          />
          <FeatureCard
            icon={Zap}
            title="Skill Development"
            description="Access cutting-edge resources, tutorials, and mentorship to accelerate your programming journey."
            delay={800}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex justify-center items-center p-8 border-t border-gray-800/50">
        <div
          className={`flex space-x-6 transform transition-all duration-1000 delay-900 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <a
            href="https://github.com/r0ktech"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://x.com/r0ktech"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="https://chat.whatsapp.com/IKkjqhwk9KuBYkJTr648UL"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default FuturisticLandingPage;
