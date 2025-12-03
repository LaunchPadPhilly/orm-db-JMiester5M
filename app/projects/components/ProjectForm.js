// TODO: Students will implement this component
// This is a learning exercise - students should build this form component from scratch
// The tests will guide the implementation requirements

// Component Requirements:
// 1. Create a form component that accepts { onSubmit, onCancel, isOpen } props
// 2. Manage form state for: title, description, imageUrl, projectUrl, githubUrl, technologies
// 3. Implement form validation:
//    - title: required
//    - description: required
//    - technologies: required (at least one)
//    - URLs: validate format if provided
// 4. Handle form submission and loading states
// 5. Display validation errors to user
// 6. Reset form after successful submission
// 7. Only render when isOpen is true
// 8. Include TechnologyInput component for managing technologies

// Learning Objectives:
// - React state management with useState
// - Form validation patterns
// - Conditional rendering
// - Event handling
// - Error state management
// - Component composition

// Hints:
// - Use 'use client' directive for client-side functionality
// - Import TechnologyInput from './TechnologyInput'
// - Use regex for URL validation: /^https?:\/\/.+\..+/
// - Handle async form submission with try/catch
// - Use loading state to prevent double submission

'use client';

import { useState } from 'react';
import TechnologyInput from './TechnologyInput';

export default function ProjectForm({ onSubmit, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    technologies: []
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    // Technologies validation
    if (formData.technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required';
    }
    
    // URL validations
    const urlRegex = /^https?:\/\/.+\..+/;
    
    if (formData.imageUrl && !urlRegex.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Invalid URL format';
    }
    
    if (formData.projectUrl && !urlRegex.test(formData.projectUrl)) {
      newErrors.projectUrl = 'Invalid URL format';
    }
    
    if (formData.githubUrl && !urlRegex.test(formData.githubUrl)) {
      newErrors.githubUrl = 'Invalid URL format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        projectUrl: '',
        githubUrl: '',
        technologies: []
      });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTechnologiesChange = (technologies) => {
    setFormData(prev => ({
      ...prev,
      technologies
    }));
    // Clear technologies error when user adds a technology
    if (errors.technologies) {
      setErrors(prev => ({
        ...prev,
        technologies: ''
      }));
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Technologies */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technologies *
              </label>
              <TechnologyInput
                technologies={formData.technologies}
                onChange={handleTechnologiesChange}
                error={errors.technologies}
              />
              {errors.technologies && (
                <p className="text-red-500 text-sm mt-1">{errors.technologies}</p>
              )}
            </div>

            {/* Image URL */}
            <div className="mb-4">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.imageUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
              )}
            </div>

            {/* Project URL */}
            <div className="mb-4">
              <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Project URL
              </label>
              <input
                type="text"
                id="projectUrl"
                name="projectUrl"
                value={formData.projectUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.projectUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.projectUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.projectUrl}</p>
              )}
            </div>

            {/* GitHub URL */}
            <div className="mb-6">
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">
                GitHub URL
              </label>
              <input
                type="text"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.githubUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.githubUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.githubUrl}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}