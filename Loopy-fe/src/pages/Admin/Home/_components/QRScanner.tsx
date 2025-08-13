import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

type QRScannerProps = {
  onDetect: (decoded: string) => void;
  onError?: (error: string) => void;
};

export default function QRScanner({ onDetect, onError }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [streamActive, setStreamActive] = useState(false);
  const scanRef = useRef<number | null>(null);
  const lastResultRef = useRef<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setStreamActive(true);
          requestAnimationFrame(tick);
        }
      } catch (e) {
        console.error('카메라 접근 실패:', e);
      }
    };

    const tick = () => {
      if (!videoRef.current || !canvasRef.current) {
        scanRef.current = requestAnimationFrame(tick);
        return;
      }
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const width = video.videoWidth;
      const height = video.videoHeight;
      if (width === 0 || height === 0) {
        scanRef.current = requestAnimationFrame(tick);
        return;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        scanRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.drawImage(video, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const code = jsQR(imageData.data, width, height, {
        inversionAttempts: 'attemptBoth',
      });

      if (code && code.data) {
        if (lastResultRef.current !== code.data) {
          lastResultRef.current = code.data;
          onDetect(code.data);
        }
      }

      scanRef.current = requestAnimationFrame(tick);
    };

    start();

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      if (scanRef.current !== null) {
        cancelAnimationFrame(scanRef.current);
      }
    };
  }, [onDetect, onError]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-full h-full"
        style={{ width: '29rem', height: '32rem', maxWidth: '100%' }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
        />
        {!streamActive && (
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50">
            카메라 로딩 중...
          </div>
        )}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
