// TODO: Students will implement this component
// This is an advanced component building exercise

// Component Requirements:
// 1. Create a component that accepts { technologies, onChange, error } props
// 2. Allow users to type in a technology name and add it to the list
// 3. Provide quick-add buttons for common technologies
// 4. Display selected technologies as removable tags
// 5. Prevent duplicate technologies
// 6. Support both keyboard (Enter) and button (Add) interactions
// 7. Handle error states with visual feedback

// Learning Objectives:
// - Advanced React state management
// - Array manipulation patterns
// - User input handling
// - Conditional styling
// - Accessibility considerations
// - Component prop patterns

// Suggested Technologies for Quick-Add:
// ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
//  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
//  'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
//  'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop']

// Implementation Hints:
// - Use 'use client' directive
// - Manage local input state with useState
// - Use filter() to remove technologies
// - Use includes() to check for duplicates
// - Handle keyPress event for Enter key
// - Style error states with conditional classes

'use client';

import { useState } from 'react';

const SUGGESTED_TECHNOLOGIES = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'JSON Server',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'ESLint', 'OpenAI API',
  'Git', 'Docker', 'AWS', 'Vercel', 'Vite', 'React Router', 'Firebase', 
  'TanStack Query', 'Lucide React'
].sort((a, b) => a.localeCompare(b));

export default function TechnologyInput({ technologies = [], onChange, error }) {
  const [inputValue, setInputValue] = useState('');

  const addTechnology = (tech) => {
    const trimmedTech = tech.trim();
    
    // Prevent empty or duplicate technologies
    if (!trimmedTech) return;
    if (technologies.includes(trimmedTech)) {
      setInputValue('');
      return;
    }
    
    onChange([...technologies, trimmedTech]);
    setInputValue('');
  };

  const removeTechnology = (techToRemove) => {
    onChange(technologies.filter(tech => tech !== techToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology(inputValue);
    }
  };

  const handleQuickAdd = (tech) => {
    addTechnology(tech);
  };

  return (
    <div className="space-y-3">
      {/* Input field with Add button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a technology"
          className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <button
          type="button"
          onClick={() => addTechnology(inputValue)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>

      {/* Selected technologies as removable tags */}
      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                aria-label={`Remove ${tech}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Quick-add buttons for common technologies */}
      <div>
        <p className="text-sm text-gray-900 mb-2">Quick add:</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_TECHNOLOGIES.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => handleQuickAdd(tech)}
              disabled={technologies.includes(tech)}
              className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                technologies.includes(tech)
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}