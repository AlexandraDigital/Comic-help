import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, CheckCircle, AlertTriangle, Trophy } from 'lucide-react';
import { UserProfile, PlotPoint, PanelInfo } from '../types';

interface ProgressTrackerProps {
  profile: UserProfile;
  plotPoints: PlotPoint[];
  panels: PanelInfo[];
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ profile, plotPoints, panels }) => {
  const totalSeconds = profile.timeMinutes * 60;
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const remaining = Math.max(0, totalSeconds - elapsed);
  const pct = Math.min(100, (elapsed / totalSeconds) * 100);
  const isOvertime = elapsed > totalSeconds;

  const completedPlot = plotPoints.filter((p) => p.completed).length;
  const completedPanels = panels.filter((p) => p.completed).length;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  // Pace analysis
  const getPaceMessage = (): { message: string; color: string; icon: React.ReactNode } => {
    if (panels.length === 0) return { message: 'Set up your panels to track pace!', color: 'text-base-content/60', icon: <Clock size={16} /> };
    if (completedPanels === panels.length) return { message: 'All panels complete! 🎉 You did it!', color: 'text-success', icon: <Trophy size={16} className="text-success" /> };

    const panelsRemaining = panels.length - completedPanels;
    const minutesRemaining = remaining / 60;
    const minutesPerPanel = minutesRemaining / panelsRemaining;

    if (minutesPerPanel >= 5) return { message: `You're on a great pace! ~${Math.round(minutesPerPanel)} min per remaining panel.`, color: 'text-success', icon: <CheckCircle size={16} className="text-success" /> };
    if (minutesPerPanel >= 2) return { message: `Keep it moving! ~${Math.round(minutesPerPanel)} min per remaining panel.`, color: 'text-warning', icon: <AlertTriangle size={16} className="text-warning" /> };
    return { message: `Time is tight! Consider simplifying remaining panels.`, color: 'text-error', icon: <AlertTriangle size={16} className="text-error" /> };
  };

  const pace = getPaceMessage();

  const reset = () => {
    setRunning(false);
    setElapsed(0);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Timer */}
      <div className="card bg-base-200">
        <div className="card-body items-center text-center">
          <div className={`text-5xl font-mono font-bold ${isOvertime ? 'text-error animate-pulse' : 'text-base-content'}`}>
            {isOvertime ? '-' : ''}{formatTime(isOvertime ? elapsed - totalSeconds : remaining)}
          </div>
          <p className="text-sm text-base-content/60">
            {isOvertime ? '⏰ Over time!' : 'remaining'}
          </p>

          <progress
            className={`progress w-full ${isOvertime ? 'progress-error' : pct > 75 ? 'progress-warning' : 'progress-primary'}`}
            value={Math.min(pct, 100)}
            max={100}
          />

          <div className="flex gap-2 mt-2">
            <button className="btn btn-primary btn-sm" onClick={() => setRunning(!running)}>
              {running ? <><Pause size={14} /> Pause</> : <><Play size={14} /> {elapsed > 0 ? 'Resume' : 'Start'}</>}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={reset}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Pace advisor */}
      <div className="alert bg-base-200">
        {pace.icon}
        <span className={`text-sm ${pace.color}`}>{pace.message}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card bg-base-200">
          <div className="card-body p-4 items-center">
            <span className="text-3xl font-bold text-primary">{completedPlot}/{plotPoints.length}</span>
            <span className="text-xs text-base-content/60">Plot Beats Done</span>
            {plotPoints.length > 0 && (
              <progress className="progress progress-primary w-full" value={completedPlot} max={plotPoints.length} />
            )}
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body p-4 items-center">
            <span className="text-3xl font-bold text-secondary">{completedPanels}/{panels.length}</span>
            <span className="text-xs text-base-content/60">Panels Drawn</span>
            {panels.length > 0 && (
              <progress className="progress progress-secondary w-full" value={completedPanels} max={panels.length} />
            )}
          </div>
        </div>
      </div>

      {/* Phase guide */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title text-sm">⏱️ Suggested Time Breakdown</h3>
          <div className="space-y-2">
            {getPhases(profile.timeMinutes).map((phase, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`badge ${elapsed / 60 >= phase.startMin && elapsed / 60 < phase.endMin ? 'badge-primary' : 'badge-ghost'} badge-sm`}>
                  {phase.minutes}m
                </div>
                <span className="text-sm flex-1">{phase.label}</span>
                <span className="text-xs text-base-content/40">{phase.hint}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function getPhases(totalMin: number) {
  const plan = Math.round(totalMin * 0.15);
  const sketch = Math.round(totalMin * 0.15);
  const draw = Math.round(totalMin * 0.50);
  const dialog = Math.round(totalMin * 0.10);
  const polish = totalMin - plan - sketch - draw - dialog;

  let start = 0;
  return [
    { label: 'Planning & Layout', minutes: plan, hint: 'Thumbnails + panel layout', startMin: start, endMin: start += plan },
    { label: 'Rough Sketches', minutes: sketch, hint: 'Loose shapes, no details', startMin: start - plan, endMin: start += sketch },
    { label: 'Drawing Panels', minutes: draw, hint: 'The main work!', startMin: start - sketch, endMin: start += draw },
    { label: 'Dialogue & Bubbles', minutes: dialog, hint: 'Text + speech bubbles', startMin: start - draw, endMin: start += dialog },
    { label: 'Polish & Review', minutes: polish, hint: 'Clean up + final touches', startMin: start - dialog, endMin: start += polish },
  ].map((p, i, arr) => {
    const cumStart = arr.slice(0, i).reduce((a, x) => a + x.minutes, 0);
    return { ...p, startMin: cumStart, endMin: cumStart + p.minutes };
  });
}
