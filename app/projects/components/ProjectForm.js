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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

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
    const dataUrlRegex = /^data:image\/.+;base64,/;
    
    // Image URL validation - allow either http(s) URL or base64 data URL
    if (formData.imageUrl && !urlRegex.test(formData.imageUrl) && !dataUrlRegex.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }
    
    if (formData.projectUrl && !urlRegex.test(formData.projectUrl)) {
      newErrors.projectUrl = 'Please enter a valid URL';
    }
    
    if (formData.githubUrl && !urlRegex.test(formData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Create a user-friendly error message using the newErrors from validateForm
      // We need to re-check the form data here since errors state hasn't updated yet
      const errorMessages = [];
      
      if (!formData.title.trim()) errorMessages.push('• Title is required');
      if (!formData.description.trim()) errorMessages.push('• Description is required');
      if (formData.technologies.length === 0) errorMessages.push('• At least one technology is required');
      
      const urlRegex = /^https?:\/\/.+\..+/;
      const dataUrlRegex = /^data:image\/.+;base64,/;
      
      if (formData.imageUrl && !urlRegex.test(formData.imageUrl) && !dataUrlRegex.test(formData.imageUrl)) {
        errorMessages.push('• Image URL must be a valid URL (e.g., https://example.com/image.jpg) or uploaded image');
      }
      if (formData.projectUrl && !urlRegex.test(formData.projectUrl)) {
        errorMessages.push('• Project URL must be a valid URL starting with http:// or https:// (e.g., https://example.com)');
      }
      if (formData.githubUrl && !urlRegex.test(formData.githubUrl)) {
        errorMessages.push('• GitHub URL must be a valid URL starting with http:// or https:// (e.g., https://github.com/username/repo)');
      }
      
      alert('Please fix the following errors:\n\n' + errorMessages.join('\n'));
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
      setImageFile(null);
      setImagePreview('');
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
    if (errors?.[name]) {
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
    if (errors?.technologies) {
      setErrors(prev => ({
        ...prev,
        technologies: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, imageUrl: 'Please select an image file' }));
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          imageUrl: reader.result // Store base64 data URL
        }));
      };
      reader.readAsDataURL(file);
      
      // Clear error
      if (errors?.imageUrl) {
        setErrors(prev => ({ ...prev, imageUrl: '' }));
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Project</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors?.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors?.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Technologies */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Technologies *
              </label>
              <TechnologyInput
                technologies={formData.technologies}
                onChange={handleTechnologiesChange}
                error={errors.technologies}
              />
              {errors?.technologies && (
                <p className="text-red-500 text-sm mt-1">{errors.technologies}</p>
              )}
            </div>

            {/* Image Upload or URL */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Project Image
              </label>
              
              {/* File Upload */}
              <div className="mb-2">
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              
              {/* Or URL */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
              
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-900 mb-1">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={imageFile ? '' : formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                disabled={imageFile !== null}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.imageUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-2">Preview:</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="max-w-xs max-h-48 rounded-md border border-gray-300" />
                </div>
              )}
              
              {errors?.imageUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
              )}
            </div>

            {/* Project URL */}
            <div className="mb-4">
              <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-900 mb-1">
                Project URL
              </label>
              <input
                type="text"
                id="projectUrl"
                name="projectUrl"
                value={formData.projectUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                  errors.projectUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors?.projectUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.projectUrl}</p>
              )}
            </div>

            {/* GitHub URL */}
            <div className="mb-4">
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-900 mb-1">
                GitHub URL
              </label>
              <input
                type="text"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                  errors?.githubUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors?.githubUrl ? (
                <p className="text-red-500 text-sm mt-1">{errors.githubUrl}</p>
              ) : null}
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
                {loading ? 'Creating Project...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}