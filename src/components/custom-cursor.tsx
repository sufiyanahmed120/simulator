"use client";

import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    let animationFrame: number;

    const updateCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create trail sparkles
      if (Math.random() > 0.7) { // 30% chance to create a sparkle
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = `${e.clientX - 2}px`;
        trail.style.top = `${e.clientY - 2}px`;
        document.body.appendChild(trail);
        
        // Remove trail after animation
        setTimeout(() => {
          if (document.body.contains(trail)) {
            document.body.removeChild(trail);
          }
        }, 1000);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      animationFrame = requestAnimationFrame(() => updateCursor(e));
    };

    // Add custom cursor class to body
    document.body.classList.add('custom-cursor');
    
    // Add event listener
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.classList.remove('custom-cursor');
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="cursor-dot"
      style={{
        left: `${mousePosition.x - 4}px`,
        top: `${mousePosition.y - 4}px`,
      }}
    />
  );
}
