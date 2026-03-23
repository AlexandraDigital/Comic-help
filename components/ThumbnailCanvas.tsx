import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Pencil, Eraser, Trash2, Undo2, Download } from 'lucide-react';

interface ThumbnailCanvasProps {
  thumbnail: string;
  onSave: (dataUrl: string) => void;
  panelNumber: number;
}

type Tool = 'pen' | 'eraser';

export const ThumbnailCanvas: React.FC<ThumbnailCanvasProps> = ({ thumbnail, onSave, panelNumber }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('pen');
  const [brushSize, setBrushSize] = useState(2);
  const [history, setHistory] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const WIDTH = 320;
  const HEIGHT = 200;

  // Load existing thumbnail
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw panel border
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);

    if (thumbnail) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = thumbnail;
    }

    // Save initial state
    setHistory([canvas.toDataURL()]);
  }, []);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHistory((prev) => [...prev.slice(-20), canvas.toDataURL()]);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = WIDTH / rect.width;
    const scaleY = HEIGHT / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    lastPos.current = getPos(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !lastPos.current) return;

    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth = brushSize * 4;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = brushSize;
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPos.current = pos;
  };

  const endDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      lastPos.current = null;
      saveState();

      // Auto-save thumbnail
      const canvas = canvasRef.current;
      if (canvas) {
        onSave(canvas.toDataURL('image/png', 0.7));
      }
    }
  };

  const undo = () => {
    if (history.length <= 1) return;
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.drawImage(img, 0, 0);
      onSave(canvas.toDataURL('image/png', 0.7));
    };
    img.src = newHistory[newHistory.length - 1];
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);

    saveState();
    onSave('');
  };

  if (!expanded) {
    return (
      <button
        className="btn btn-ghost btn-xs gap-1"
        onClick={() => setExpanded(true)}
      >
        <Pencil size={12} />
        {thumbnail ? 'Edit Sketch' : 'Add Sketch'}
      </button>
    );
  }

  return (
    <div className="thumbnail-canvas-wrap space-y-2 mt-1">
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--text-dim)' }}>Panel {panelNumber} Sketch</span>
        <button className="btn btn-ghost btn-xs" onClick={() => setExpanded(false)}>Collapse</button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 flex-wrap">
        <button
          className={`btn btn-xs ${tool === 'pen' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setTool('pen')}
        >
          <Pencil size={12} /> Pen
        </button>
        <button
          className={`btn btn-xs ${tool === 'eraser' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setTool('eraser')}
        >
          <Eraser size={12} /> Eraser
        </button>
        <input
          type="range"
          min={1}
          max={8}
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="range range-xs range-primary w-16"
        />
        <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{brushSize}px</span>
        <div style={{ flex: 1 }} />
        <button className="btn btn-ghost btn-xs" onClick={undo} disabled={history.length <= 1}>
          <Undo2 size={12} />
        </button>
        <button className="btn btn-ghost btn-xs" style={{ color: '#f87171' }} onClick={clear}>
          <Trash2 size={12} />
        </button>
      </div>

      {/* Canvas — fills container, aspect ratio 8:5 */}
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
      />
    </div>
  );
};
