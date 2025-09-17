import React, { useRef, useState, useEffect } from 'react';
import { CloseIcon } from './icons';

declare global {
  interface Window {
    QRCode: any;
  }
}

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Timeout to allow modal to render and QRCode library to be ready
      setTimeout(() => {
        if (canvasRef.current && typeof window.QRCode !== 'undefined') {
          window.QRCode.toCanvas(
            canvasRef.current,
            window.location.href,
            {
              width: 256,
              margin: 2,
              errorCorrectionLevel: 'H',
              color: {
                dark: '#0f172a', // slate-900
                light: '#eff6ff', // blue-50
              },
            },
            (error: Error | null) => {
              if (error) console.error('QR Code generation failed:', error);
              setIsLoading(false);
            }
          );
        } else {
            console.error('QRCode library is not available or canvas is not ready.');
            setIsLoading(false);
        }
      }, 200);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-xs animate-fade-in-up"
        style={{ animationDuration: '0.3s' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
          aria-label="Close QR Code"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Scan Me!</h2>
        <p className="text-slate-500 mb-6">Scan this code to open the offer on your phone.</p>
        <div className="relative w-64 h-64 mx-auto bg-blue-50 rounded-lg flex items-center justify-center">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
                </div>
            )}
            <canvas ref={canvasRef} className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}/>
        </div>
      </div>
    </div>
  );
}
