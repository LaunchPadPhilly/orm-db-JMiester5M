'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectForm from './components/ProjectForm';
import { useAuth } from '@/app/lib/authContext';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle project creation
  const handleCreateProject = async (projectData) => {
    try {
      // Get Firebase token
      const token = await user.getIdToken();
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) throw new Error('Failed to create project');

      // Refresh projects list
      await fetchProjects();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Add New Project button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
          <h1 className="text-3xl md:text-6xl font-bold leading-tight text-gray-100">My Projects</h1>
          {user && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-700 text-white px-4 md:px-8 py-2 md:py-3 rounded-lg hover:bg-purple-800 hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold text-sm md:text-lg whitespace-nowrap"
            >
              + Add New Project
            </button>
          )}
        </div>

        {/* ProjectForm component */}
        <ProjectForm
          isOpen={showForm}
          onSubmit={handleCreateProject}
          onCancel={() => setShowForm(false)}
        />

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
            <p className="mt-4 text-gray-300">Loading projects...</p>
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8">
                {projects.map((project) => (
                  <div key={project.id} className="bg-purple-800/50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-purple-600/30 flex flex-col">
                  <div className="flex-shrink-0 w-full h-32 md:h-auto bg-purple-900/20 flex items-center justify-center overflow-hidden">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        width={192}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Image
                        src="/placeholder.svg"
                        alt="No Image"
                        width={192}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="p-3 md:p-6 flex flex-col flex-grow">
                      <h3 className="text-lg md:text-2xl font-bold mb-2 text-gray-100 line-clamp-2">{project.title}</h3>
                      <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 flex-grow">{project.description}</p>
                      <div className="flex gap-1 md:gap-2 mb-3 md:mb-4 flex-wrap">
                        {project.technologies?.slice(0, 3).map((tech, index) => (
                          <span key={index} className="text-xs md:text-sm bg-purple-700/50 text-purple-200 px-2 md:px-3 py-1 rounded border border-purple-500/30 flex-shrink-0">
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 3 && (
                          <span className="text-xs md:text-sm text-purple-300 px-2 md:px-3 py-1 flex-shrink-0">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1 md:gap-2 flex-wrap">
                        <Link 
                          href={`/projects/${project.id}`}
                          className="text-xs md:text-sm bg-purple-600 text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-purple-700 transition-colors flex-1 md:flex-none text-center"
                        >
                          <span className="md:hidden">Details</span>
                          <span className="hidden md:inline">View Details</span>
                        </Link>
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs md:text-sm bg-purple-700/50 text-purple-200 px-2 md:px-4 py-1 md:py-2 rounded hover:bg-purple-600 transition-colors border border-purple-500/30 flex-1 md:flex-none text-center"
                          >
                            <span className="md:hidden">Live</span>
                            <span className="hidden md:inline">Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">No projects yet</h2>
                  <p className="text-gray-300 mb-6">
                    Get started by adding your first project!
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    + Add Your First Project
                  </button>
                </div>

                <div className="bg-purple-800/30 border-2 border-purple-600/50 rounded-lg p-6 max-w-md mx-auto mb-8">
                  <h3 className="font-bold text-purple-300 mb-2">🚀 Getting Started:</h3>
                  <ol className="text-purple-200 space-y-1 list-decimal list-inside text-left">
                    <li>Set up your Neon database</li>
                    <li>Implement the API routes</li>
                    <li>Add project creation functionality</li>
                    <li>Convert this page to use database data</li>
                  </ol>
                </div>

                {/* Project Ideas - Only shown when no projects */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
                  <h3 className="font-bold text-yellow-900 mb-2">💡 Project Ideas:</h3>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Past school projects</li>
                    <li>• Personal coding projects</li>
                    <li>• Design work or creative projects</li>
                    <li>• Future projects you want to build (coming soon!)</li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
