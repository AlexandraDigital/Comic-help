import React, { useState } from 'react';
import { Sparkles, Clock } from 'lucide-react';
import { UserProfile, GENRES } from '../types';

interface SetupProps {
  onComplete: (profile: UserProfile) => void;
  existingProfile: UserProfile | null;
}

export const Setup: React.FC<SetupProps> = ({ onComplete, existingProfile }) => {
  const [name, setName] = useState(existingProfile?.name || '');
  const [skillLevel, setSkillLevel] = useState<UserProfile['skillLevel']>(existingProfile?.skillLevel || 'beginner');
  const [timeMinutes, setTimeMinutes] = useState(existingProfile?.timeMinutes || 30);
  const [genre, setGenre] = useState(existingProfile?.genre || '');

  const canProceed = name.trim() && genre;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="text-4xl mb-2">💥</div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Bangers','Impact',cursive", letterSpacing: '0.08em' }}>
            Let's Make a Comic!
          </h1>
          <p className="text-sm text-base-content/50 mt-1">Quick setup — takes 30 seconds.</p>
        </div>

        {/* Name */}
        <div>
          <label className="label-text block mb-1.5">Your Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="What should I call you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Skill Level */}
        <div>
          <label className="label-text block mb-1.5">Drawing Experience</label>
          <div className="grid grid-cols-3 gap-2">
            {([
              { value: 'beginner' as const, label: '🌱 New', desc: 'Never drawn comics' },
              { value: 'some-experience' as const, label: '🌿 Some XP', desc: 'Doodled a bit' },
              { value: 'intermediate' as const, label: '🌳 Getting there', desc: 'Made a few' },
            ]).map((opt) => (
              <button
                key={opt.value}
                className={`btn btn-sm h-auto py-2.5 flex flex-col gap-0.5 ${skillLevel === opt.value ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSkillLevel(opt.value)}
              >
                <span className="text-sm">{opt.label}</span>
                <span className="text-xs opacity-60">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="label-text flex items-center gap-1.5"><Clock size={14} /> Time Available</label>
            <span className="text-primary font-bold text-sm" style={{ fontFamily: "'Bangers','Impact',cursive", letterSpacing: '0.06em' }}>
              {timeMinutes} min
            </span>
          </div>
          <input
            type="range"
            min={10} max={180} step={5}
            value={timeMinutes}
            onChange={(e) => setTimeMinutes(Number(e.target.value))}
            className="range range-primary range-sm w-full"
          />
          <div className="flex justify-between text-xs text-base-content/30 mt-1">
            <span>10 min</span><span>1 hr</span><span>3 hrs</span>
          </div>
        </div>

        {/* Genre */}
        <div>
          <label className="label-text block mb-1.5">Genre / Vibe</label>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <button
                key={g}
                className={`btn btn-sm ${genre === g ? 'btn-secondary' : 'btn-ghost'}`}
                onClick={() => setGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn btn-primary w-full"
          disabled={!canProceed}
          onClick={() => onComplete({ name: name.trim(), skillLevel, timeMinutes, genre })}
        >
          <Sparkles size={16} /> Let's Go!
        </button>
      </div>
    </div>
  );
};
