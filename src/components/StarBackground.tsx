'use client';

import React, { useEffect, useRef } from 'react';

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; radius: number; opacity: number; change: number }[] = [];
    
    // Initial color setup
    let starBaseColor = '255, 255, 255';
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateStarColor = () => {
        if (mediaQuery.matches) {
            starBaseColor = '255, 255, 255'; // White for dark mode
        } else {
            starBaseColor = '15, 23, 42'; // Dark blue for light mode
        }
    };
    
    updateStarColor();

    // Listen for theme changes
    const handleChange = () => updateStarColor();
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
    } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 4000); // Adjust density
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random(),
          change: (Math.random() * 0.02) - 0.01
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starBaseColor}, ${star.opacity})`;
        ctx.fill();

        // Twinkle
        star.opacity += star.change;
        if (star.opacity <= 0 || star.opacity >= 1) {
          star.change = -star.change;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
      } else {
          mediaQuery.removeListener(handleChange);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1,
        pointerEvents: 'none'
      }} 
    />
  );
};

export default StarBackground;
