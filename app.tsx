import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { BookOpen, Layout, Pencil, Timer, Settings } from 'lucide-react';
import { UserProfile, Character, PlotPoint, PanelInfo, AppScreen, DashboardTab } from './types';
import { Setup } from './components/Setup';
import { StoryBuilder } from './components/StoryBuilder';
import { PanelPlanner } from './components/PanelPlanner';
import { DrawingTips } from './components/DrawingTips';
import { ProgressTracker } from './components/ProgressTracker';

const SAVE_PATH = '/agent/home/apps/comic-help/save-data.json';

interface SaveData {
  profile: UserProfile;
  characters: Character[];
  plotPoints: PlotPoint[];
  panels: PanelInfo[];
  synopsis: string;
}

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('setup');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [plotPoints, setPlotPoints] = useState<PlotPoint[]>([]);
  const [panels, setPanels] = useState<PanelInfo[]>([]);
  const [synopsis, setSynopsis] = useState('');
  const [activeTab, setActiveTab] = useState<DashboardTab>('story');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    window.tasklet.readFileFromDisk(SAVE_PATH).then((data) => {
      try {
        const saved: SaveData = JSON.parse(data);
        if (saved.profile) {
          setProfile(saved.profile);
          setCharacters((saved.characters || []).map((c: any, i: number) => ({
            ...c,
            id: c.id || `char_migrated_${Date.now()}_${i}`,
            faction: c.faction || 'Hero Side',
            powers: c.powers || '',
            motivations: c.motivations || '',
            relationships: c.relationships || '',
          })));
          setPlotPoints(saved.plotPoints || []);
          setPanels((saved.panels || []).map((p: any) => ({
            ...p,
            thumbnail: p.thumbnail || '',
          })));
          setSynopsis(saved.synopsis || '');
          setScreen('dashboard');
        }
      } catch {
        // No save data
      }
    }).catch(() => {});
  }, []);

  const save = useCallback(async () => {
    if (!profile) return;
    setSaveStatus('saving');
    const data: SaveData = { profile, characters, plotPoints, panels, synopsis };
    try {
      await window.tasklet.writeFileToDisk(SAVE_PATH, JSON.stringify(data, null, 2));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 1500);
    } catch {
      setSaveStatus('idle');
    }
  }, [profile, characters, plotPoints, panels, synopsis]);

  useEffect(() => {
    if (!profile || screen !== 'dashboard') return;
    const timer = setTimeout(save, 2000);
    return () => clearTimeout(timer);
  }, [profile, characters, plotPoints, panels, synopsis, screen, save]);

  const handleSetupComplete = (p: UserProfile) => {
    setProfile(p);
    setScreen('dashboard');
  };

  if (screen === 'setup') {
    return <Setup onComplete={handleSetupComplete} existingProfile={profile} />;
  }

  if (!profile) return null;

  const tabs: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { id: 'story',    label: 'Story',    icon: <BookOpen size={16} /> },
    { id: 'panels',   label: 'Panels',   icon: <Layout size={16} /> },
    { id: 'tips',     label: 'Tips',     icon: <Pencil size={16} /> },
    { id: 'progress', label: 'Progress', icon: <Timer size={16} /> },
  ];

  return (
    <div className="app-shell">
      {/* Header */}
      <div className="app-header">
        <span className="header-emoji">💥</span>
        <span className="header-title">{profile.name}'s Comic</span>
        <span className="header-meta">{profile.genre} · {profile.timeMinutes}m</span>
        <div className="header-spacer" />
        {saveStatus === 'saving' && <span className="loading loading-spinner loading-xs text-primary" />}
        {saveStatus === 'saved' && <span className="save-tick">✓</span>}
        <button className="btn btn-ghost btn-sm" onClick={() => setScreen('setup')}>
          <Settings size={15} />
        </button>
      </div>

      {/* Tabs */}
      <div className="app-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`app-tab ${activeTab === tab.id ? 'app-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="app-content">
        <div className="app-content-inner">
          {activeTab === 'story' && (
            <StoryBuilder
              profile={profile}
              characters={characters}
              setCharacters={setCharacters}
              plotPoints={plotPoints}
              setPlotPoints={setPlotPoints}
              synopsis={synopsis}
              setSynopsis={setSynopsis}
            />
          )}
          {activeTab === 'panels' && (
            <PanelPlanner
              profile={profile}
              panels={panels}
              setPanels={setPanels}
              plotPoints={plotPoints}
            />
          )}
          {activeTab === 'tips' && <DrawingTips profile={profile} />}
          {activeTab === 'progress' && (
            <ProgressTracker profile={profile} plotPoints={plotPoints} panels={panels} />
          )}
        </div>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
