import React, { useEffect, useState } from 'react';

const CONFETTI_COUNT = 100;
const COLORS = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];

interface ConfettiPiece {
  id: number;
  style: React.CSSProperties;
}

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces = Array.from({ length: CONFETTI_COUNT }).map((_, index) => ({
      id: index,
      style: {
        left: `${Math.random() * 100}vw`,
        backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        transform: `rotate(${Math.random() * 360}deg)`,
        animationDelay: `${Math.random() * 5}s`,
        width: `${Math.floor(Math.random() * 8 + 6)}px`,
        height: `${Math.floor(Math.random() * 12 + 8)}px`,
        animationDuration: `${Math.random() * 3 + 3}s`,
      },
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {pieces.map(piece => (
        <div key={piece.id} className="confetti-piece" style={piece.style}></div>
      ))}
    </div>
  );
}
