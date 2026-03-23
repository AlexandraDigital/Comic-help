import React from 'react';
import { Layout, Plus, Trash2, CheckCircle, Circle, Lightbulb } from 'lucide-react';
import { UserProfile, PanelInfo, PlotPoint, SHOT_TYPES } from '../types';
import { ThumbnailCanvas } from './ThumbnailCanvas';

interface PanelPlannerProps {
  profile: UserProfile;
  panels: PanelInfo[];
  setPanels: React.Dispatch<React.SetStateAction<PanelInfo[]>>;
  plotPoints: PlotPoint[];
}

export const PanelPlanner: React.FC<PanelPlannerProps> = ({ profile, panels, setPanels, plotPoints }) => {
  const suggestedPanels = getSuggestedPanelCount(profile.timeMinutes, profile.skillLevel);

  const addPanel = () => {
    const num = panels.length + 1;
    setPanels((prev) => [...prev, {
      id: Date.now().toString(),
      panelNumber: num,
      plotPointId: plotPoints[0]?.id || '',
      description: '',
      shotType: 'Medium',
      dialogueNotes: '',
      completed: false,
      thumbnail: '',
    }]);
  };

  const updatePanel = (id: string, updates: Partial<PanelInfo>) => {
    setPanels((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const removePanel = (id: string) => {
    setPanels((prev) => prev.filter((p) => p.id !== id).map((p, i) => ({ ...p, panelNumber: i + 1 })));
  };

  const togglePanel = (id: string) => {
    setPanels((prev) => prev.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p)));
  };

  const autoGenerate = () => {
    if (plotPoints.length === 0) return;
    const newPanels: PanelInfo[] = [];
    const perBeat = Math.max(1, Math.floor(suggestedPanels / plotPoints.length));
    let panelNum = 1;

    plotPoints.forEach((point, beatIdx) => {
      const count = beatIdx === plotPoints.length - 1 ? suggestedPanels - newPanels.length : perBeat;
      for (let i = 0; i < count; i++) {
        newPanels.push({
          id: `${Date.now()}-${panelNum}`,
          panelNumber: panelNum,
          plotPointId: point.id,
          description: i === 0 ? point.description : '',
          shotType: i === 0 ? 'Wide/Establishing' : 'Medium',
          dialogueNotes: '',
          completed: false,
          thumbnail: '',
        });
        panelNum++;
      }
    });

    setPanels(newPanels);
  };

  const completedCount = panels.filter((p) => p.completed).length;

  return (
    <div className="space-y-4 p-4">
      {/* Suggestion banner */}
      <div className="alert">
        <Lightbulb size={18} className="text-primary" />
        <div>
          <p className="text-sm" style={{fontFamily:"'Bangers','Impact',cursive",letterSpacing:'0.06em',fontSize:'1rem'}}>
            💡 {profile.timeMinutes} minutes = <span className="text-primary">{suggestedPanels} panels</span> — POW!
          </p>
          <p className="text-xs text-base-content/60">
            {profile.skillLevel === 'beginner'
              ? 'That\'s about ' + Math.round(profile.timeMinutes / suggestedPanels) + ' min per panel. Simple layouts work great!'
              : 'That gives you room for detail while staying on pace.'}
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 flex-wrap">
        <button className="btn btn-sm btn-primary" onClick={autoGenerate} disabled={plotPoints.length === 0}>
          <Layout size={14} /> Auto-Generate from Plot
        </button>
        <button className="btn btn-sm btn-ghost border border-base-300" onClick={addPanel}>
          <Plus size={14} /> Add Panel
        </button>
      </div>

      {plotPoints.length === 0 && panels.length === 0 && (
        <div className="text-center py-8 text-base-content/40">
          <Layout size={40} className="mx-auto mb-2 opacity-40" />
          <p>Set up your plot structure in the Story tab first, then come back to plan panels!</p>
        </div>
      )}

      {/* Progress */}
      {panels.length > 0 && (
        <div className="flex items-center gap-3">
          <progress className="progress progress-success flex-1" value={completedCount} max={panels.length} />
          <span className="text-sm text-base-content/60">{completedCount}/{panels.length} drawn</span>
        </div>
      )}

      {/* Panel cards */}
      <div className="space-y-3">
        {panels.map((panel) => {
          const linkedBeat = plotPoints.find((p) => p.id === panel.plotPointId);
          return (
            <div key={panel.id} className={`card bg-base-200 ${panel.completed ? 'opacity-60' : ''}`}>
              <div className="card-body p-3 gap-2">
                <div className="flex items-center gap-2">
                  <button onClick={() => togglePanel(panel.id)} className="shrink-0">
                    {panel.completed
                      ? <CheckCircle size={20} className="text-success" />
                      : <Circle size={20} className="opacity-40" />}
                  </button>
                  <span style={{fontFamily:"'Bangers','Impact',cursive",letterSpacing:'0.1em',fontSize:'1rem'}}>
                    PANEL {panel.panelNumber}
                  </span>
                  {linkedBeat && <span className="badge badge-sm badge-primary">{linkedBeat.label}</span>}
                  <div className="flex-1" />
                  <button className="btn btn-ghost btn-xs text-error" onClick={() => removePanel(panel.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="select select-sm select-bordered"
                    value={panel.plotPointId}
                    onChange={(e) => updatePanel(panel.id, { plotPointId: e.target.value })}
                  >
                    <option value="">— Plot beat —</option>
                    {plotPoints.map((p) => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                  <select
                    className="select select-sm select-bordered"
                    value={panel.shotType}
                    onChange={(e) => updatePanel(panel.id, { shotType: e.target.value })}
                  >
                    {SHOT_TYPES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <textarea
                  className="textarea textarea-bordered textarea-sm w-full"
                  placeholder="What happens in this panel? What do we see?"
                  value={panel.description}
                  rows={2}
                  onChange={(e) => updatePanel(panel.id, { description: e.target.value })}
                />
                <textarea
                  className="textarea textarea-bordered textarea-sm w-full"
                  placeholder="Dialogue or sound effects..."
                  value={panel.dialogueNotes}
                  rows={1}
                  onChange={(e) => updatePanel(panel.id, { dialogueNotes: e.target.value })}
                />

                {/* Thumbnail sketch */}
                <ThumbnailCanvas
                  thumbnail={panel.thumbnail}
                  onSave={(dataUrl) => updatePanel(panel.id, { thumbnail: dataUrl })}
                  panelNumber={panel.panelNumber}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function getSuggestedPanelCount(minutes: number, skill: string): number {
  const minutesPerPanel = skill === 'beginner' ? 8 : skill === 'some-experience' ? 5 : 3;
  const drawTime = minutes * 0.8;
  return Math.max(3, Math.round(drawTime / minutesPerPanel));
}
