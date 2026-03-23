import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { UserProfile, Character, PlotPoint, PLOT_TEMPLATES } from '../types';

interface StoryBuilderProps {
  profile: UserProfile;
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  plotPoints: PlotPoint[];
  setPlotPoints: React.Dispatch<React.SetStateAction<PlotPoint[]>>;
  synopsis: string;
  setSynopsis: React.Dispatch<React.SetStateAction<string>>;
}

export const StoryBuilder: React.FC<StoryBuilderProps> = ({
  profile, characters, setCharacters, plotPoints, setPlotPoints, synopsis, setSynopsis,
}) => {
  const [expandedChar, setExpandedChar] = useState<string | null>(null);

  const addCharacter = () => {
    const newChar: Character = {
      id: Date.now().toString(),
      name: '',
      role: 'other',
      faction: 'Hero Side',
      powers: '',
      motivations: '',
      relationships: '',
      description: '',
      visualNotes: '',
    };
    setCharacters((prev) => [...prev, newChar]);
    setExpandedChar(newChar.id);
  };

  const updateCharacter = (id: string, updates: Partial<Character>) => {
    setCharacters((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const removeCharacter = (id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
  };

  const togglePlotPoint = (id: string) => {
    setPlotPoints((prev) => prev.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p)));
  };

  const updatePlotPoint = (id: string, updates: Partial<PlotPoint>) => {
    setPlotPoints((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const removePlotPoint = (id: string) => {
    setPlotPoints((prev) => prev.filter((p) => p.id !== id));
  };

  const applyTemplate = (name: string) => {
    const template = PLOT_TEMPLATES[name];
    if (template) setPlotPoints(template.map((p) => ({ ...p, id: Date.now().toString() + p.id })));
  };

  return (
    <div className="p-4 space-y-8">

      {/* Synopsis */}
      <section>
        <label className="section-label">Story</label>
        <textarea
          className="textarea w-full"
          placeholder="What's your comic about in one or two sentences?"
          rows={3}
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        />
      </section>

      {/* Plot Beats */}
      <section>
        <label className="section-label">Plot Beats</label>

        {/* Template presets */}
        <div className="flex flex-wrap gap-2 mb-3">
          {Object.keys(PLOT_TEMPLATES).map((name) => (
            <button key={name} className="btn btn-xs btn-ghost" onClick={() => applyTemplate(name)}>
              {name}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {plotPoints.map((point, idx) => (
            <div key={point.id} className="flex items-center gap-2">
              <button
                onClick={() => togglePlotPoint(point.id)}
                className={`w-5 h-5 rounded-full border-2 shrink-0 transition-colors ${
                  point.completed ? 'bg-primary border-primary' : 'border-base-content/20'
                }`}
              />
              <input
                className="input input-sm flex-1"
                placeholder={`Beat ${idx + 1}`}
                value={point.label}
                onChange={(e) => updatePlotPoint(point.id, { label: e.target.value })}
              />
              <button className="btn btn-ghost btn-xs text-error" onClick={() => removePlotPoint(point.id)}>
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        <button
          className="btn btn-ghost btn-sm mt-3"
          onClick={() => setPlotPoints((prev) => [...prev, { id: Date.now().toString(), label: '', description: '', completed: false }])}
        >
          <Plus size={14} /> Add beat
        </button>
      </section>

      {/* Characters */}
      <section>
        <label className="section-label">Characters</label>

        <div className="space-y-2">
          {characters.map((char) => (
            <div key={char.id} className="bg-base-200 rounded-xl overflow-hidden">
              {/* Row */}
              <div
                className="flex items-center gap-3 px-3 py-2.5 cursor-pointer"
                onClick={() => setExpandedChar(expandedChar === char.id ? null : char.id)}
              >
                <span className="flex-1 font-medium text-sm" style={{ fontFamily: "'Bangers','Impact',cursive", letterSpacing: '0.06em' }}>
                  {char.name || 'New Character'}
                </span>
                <span className="text-xs text-base-content/40">{char.faction}</span>
                {expandedChar === char.id ? <ChevronUp size={14} className="opacity-40" /> : <ChevronDown size={14} className="opacity-40" />}
              </div>

              {/* Expanded */}
              {expandedChar === char.id && (
                <div className="px-3 pb-3 space-y-2 border-t border-base-300/30 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="input input-sm"
                      placeholder="Name"
                      value={char.name}
                      onChange={(e) => updateCharacter(char.id, { name: e.target.value })}
                    />
                    <select
                      className="select select-sm"
                      value={char.faction}
                      onChange={(e) => updateCharacter(char.id, { faction: e.target.value })}
                    >
                      <option>Hero Side</option>
                      <option>Villain Side</option>
                      <option>Neutral</option>
                      <option>O-verse</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <input
                    className="input input-sm w-full"
                    placeholder="Powers / abilities"
                    value={char.powers}
                    onChange={(e) => updateCharacter(char.id, { powers: e.target.value })}
                  />
                  <textarea
                    className="textarea textarea-sm w-full"
                    placeholder="Notes — look, motivation, backstory..."
                    value={char.description}
                    rows={2}
                    onChange={(e) => updateCharacter(char.id, { description: e.target.value })}
                  />
                  <button className="btn btn-ghost btn-xs text-error" onClick={() => removeCharacter(char.id)}>
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="btn btn-ghost btn-sm mt-3" onClick={addCharacter}>
          <Plus size={14} /> Add character
        </button>
      </section>

    </div>
  );
};
