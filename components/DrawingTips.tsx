import React, { useState } from 'react';
import { Pencil, Layers, MessageSquare, Eye, Zap, Shapes, ChevronDown, ChevronUp } from 'lucide-react';
import { UserProfile } from '../types';

interface DrawingTipsProps {
  profile: UserProfile;
}

interface TipSection {
  icon: React.ReactNode;
  title: string;
  tips: { heading: string; body: string; beginner?: boolean }[];
}

export const DrawingTips: React.FC<DrawingTipsProps> = ({ profile }) => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const sections: TipSection[] = [
    {
      icon: <Pencil size={16} />,
      title: 'Drawing Characters Fast',
      tips: [
        { heading: 'Simple shapes work', body: 'Circle head + rectangle body + stick limbs is totally valid. Many famous comics use super simple art.', beginner: true },
        { heading: 'One unique feature per character', body: 'A hat, unusual hair, glasses, a scar. Readers will tell them apart even with simple drawings.' },
        { heading: '6 expressions is all you need', body: 'Happy, sad, angry, surprised, worried, neutral. Practice these on plain circles — that\'s it!', beginner: true },
        { heading: 'Hide the hands', body: 'Hands behind backs, in pockets, or as simple mittens. Even pros struggle with hands.', beginner: true },
      ],
    },
    {
      icon: <Layers size={16} />,
      title: 'Panel Layout',
      tips: [
        { heading: 'Start with a grid', body: '2×2 or 2×3 panels. Consistent sizes are easier to draw and read. Save fancy layouts for later.', beginner: true },
        { heading: 'Big panel = big moment', body: 'A climactic punch? Full-width. A quiet beat? Small panel. Size = emphasis.' },
        { heading: 'First panel = establishing shot', body: 'Show WHERE the scene is before zooming into the action.', beginner: true },
        { heading: 'Leave gutters', body: 'Thin white space between panels (~5mm) keeps things clean and readable.' },
      ],
    },
    {
      icon: <MessageSquare size={16} />,
      title: 'Speech Bubbles & Text',
      tips: [
        { heading: 'Bubbles go at the top', body: 'Readers look there first. Speaker on the left talks first (reading order).', beginner: true },
        { heading: 'Keep dialogue short', body: '2–3 sentences max per bubble. Split longer dialogue across multiple bubbles.' },
        { heading: 'Bubble shape = tone', body: 'Round = speech. Cloudy = thought. Jagged = shouting or radio. Box = narrator caption.' },
        { heading: 'Write dialogue before drawing', body: 'Know how much space you need before you lay out the panels.', beginner: true },
      ],
    },
    {
      icon: <Eye size={16} />,
      title: 'Camera Angles',
      tips: [
        { heading: 'Wide shot', body: 'Full scene — where we are, who\'s there. Use for opening panels.', beginner: true },
        { heading: 'Medium shot', body: 'Waist up. The workhorse — great for dialogue and action.' },
        { heading: 'Close-up', body: 'Face or important object fills the panel. Perfect for emotional beats.' },
        { heading: 'Mix it up', body: '3+ identical shots in a row feels static. Vary your angles to keep energy up.' },
      ],
    },
    {
      icon: <Zap size={16} />,
      title: 'Speed Tips',
      tips: [
        { heading: 'Thumbnail first', body: 'Tiny rough sketches of each panel before drawing full size — 5 min saves 30.', beginner: true },
        { heading: '3 tones only', body: 'White, mid-gray, black. Skip complex shading — simple contrast looks punchy.', beginner: true },
        { heading: 'Background shortcuts', body: 'Speed lines for action. A horizon line + rectangle = a room. Gradients = sky.' },
        { heading: 'Sketchy is a style', body: 'Rough confident lines look GREAT in comics. Don\'t waste time perfecting every stroke.' },
      ],
    },
    {
      icon: <Shapes size={16} />,
      title: 'Visual Storytelling',
      tips: [
        { heading: 'Motion lines', body: 'Parallel lines = speed. Curved lines = swinging. Radiating lines = impact.', beginner: true },
        { heading: 'Weather = mood', body: 'Rain = sadness. Sunshine = happy. Dark shadows = tension.' },
        { heading: 'The silent panel', body: 'No words. Just image. Incredibly powerful for reveals and emotional beats.' },
        { heading: 'Universal symbols', body: '❤️ = love. ⭐ = dizzy. 💡 = idea. 💧 = nervous. Use them freely.', beginner: true },
      ],
    },
  ];

  return (
    <div className="space-y-2 p-4">
      <p className="text-sm text-base-content/50 mb-3"
        style={{ fontFamily: "'Bangers','Impact',cursive", letterSpacing: '0.06em' }}>
        {profile.skillLevel === 'beginner'
          ? `Hey ${profile.name}! ⭐ = must-reads for beginners.`
          : `Tips & tricks to sharpen your game, ${profile.name}.`}
      </p>

      {sections.map((section, idx) => (
        <div key={idx} className="card bg-base-200">
          <button
            className="w-full flex items-center gap-2 px-4 py-3 text-left"
            onClick={() => setOpenSection(openSection === idx ? null : idx)}
          >
            <span className="text-primary">{section.icon}</span>
            <span className="flex-1 font-medium"
              style={{ fontFamily: "'Bangers','Impact',cursive", letterSpacing: '0.07em', fontSize: '0.95rem' }}>
              {section.title}
            </span>
            {openSection === idx ? <ChevronUp size={14} className="opacity-40" /> : <ChevronDown size={14} className="opacity-40" />}
          </button>

          {openSection === idx && (
            <div className="px-4 pb-4 space-y-2">
              {section.tips.map((tip, tipIdx) => (
                <div key={tipIdx} className="bg-base-100 rounded-xl p-3 flex gap-2">
                  {tip.beginner && profile.skillLevel === 'beginner' && (
                    <span className="text-primary text-xs mt-0.5 shrink-0">⭐</span>
                  )}
                  <div>
                    <p className="text-sm font-semibold">{tip.heading}</p>
                    <p className="text-xs text-base-content/55 mt-0.5">{tip.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
