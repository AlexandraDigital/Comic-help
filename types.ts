export interface UserProfile {
  name: string;
  skillLevel: 'beginner' | 'some-experience' | 'intermediate';
  timeMinutes: number;
  genre: string;
}

export interface Character {
  id: string;
  name: string;
  role: 'protagonist' | 'antagonist' | 'sidekick' | 'mentor' | 'comic-relief' | 'team-member' | 'other';
  faction: string;
  powers: string;
  motivations: string;
  relationships: string;
  description: string;
  visualNotes: string;
}

export interface PlotPoint {
  id: string;
  label: string;
  description: string;
  completed: boolean;
}

export interface PanelInfo {
  id: string;
  panelNumber: number;
  plotPointId: string;
  description: string;
  shotType: string;
  dialogueNotes: string;
  completed: boolean;
  thumbnail: string;
}

export type AppScreen = 'setup' | 'dashboard';
export type DashboardTab = 'story' | 'panels' | 'tips' | 'progress';

export const GENRES = [
  'Superhero', 'Slice of Life', 'Fantasy', 'Sci-Fi', 'Horror',
  'Comedy', 'Mystery', 'Romance', 'Action', 'Drama'
] as const;

export const SHOT_TYPES = [
  'Wide/Establishing', 'Medium', 'Close-up', 'Over-the-shoulder',
  'Bird\'s Eye', 'Worm\'s Eye', 'Dutch Angle', 'Panel-in-panel'
] as const;

export const PLOT_TEMPLATES: Record<string, PlotPoint[]> = {
  'Three-Act': [
    { id: '1', label: 'Setup', description: 'Introduce your character, setting, and the normal world.', completed: false },
    { id: '2', label: 'Inciting Incident', description: 'Something disrupts the normal world — the story kicks off!', completed: false },
    { id: '3', label: 'Rising Action', description: 'Tension builds. Your character faces obstacles.', completed: false },
    { id: '4', label: 'Climax', description: 'The biggest moment — the main conflict reaches its peak.', completed: false },
    { id: '5', label: 'Resolution', description: 'Wrap it up. Show the new normal or leave a cliffhanger.', completed: false },
  ],
  'Hero\'s Journey (Simple)': [
    { id: '1', label: 'Ordinary World', description: 'Show the hero in their everyday life.', completed: false },
    { id: '2', label: 'Call to Adventure', description: 'Something calls the hero to action.', completed: false },
    { id: '3', label: 'Trials & Allies', description: 'The hero meets friends and faces challenges.', completed: false },
    { id: '4', label: 'The Ordeal', description: 'The hero faces their biggest challenge yet.', completed: false },
    { id: '5', label: 'Return Changed', description: 'The hero returns home, transformed by the journey.', completed: false },
  ],
  'Gag Strip': [
    { id: '1', label: 'Setup', description: 'Set the scene and establish the premise.', completed: false },
    { id: '2', label: 'Build-up', description: 'Escalate the situation or add a twist.', completed: false },
    { id: '3', label: 'Punchline', description: 'Deliver the joke or surprise!', completed: false },
  ],
  'Slice of Life': [
    { id: '1', label: 'Moment', description: 'Show a quiet, relatable everyday moment.', completed: false },
    { id: '2', label: 'Reflection', description: 'A small realization or feeling emerges.', completed: false },
    { id: '3', label: 'Connection', description: 'A human connection or emotional beat closes it out.', completed: false },
  ],
};
