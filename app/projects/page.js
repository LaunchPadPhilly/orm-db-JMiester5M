'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectForm from './components/ProjectForm';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Add New Project button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h1 className="text-5xl font-bold">My Projects</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            + Add New Project
          </button>
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
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            {projects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center py-8 px-4 min-h-[120px]">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          width={192}
                          height={96}
                          className="w-48 h-auto object-contain"
                        />
                      ) : (
                        <Image
                          src="/placeholder.svg"
                          alt="No Image"
                          width={192}
                          height={96}
                          className="w-48 h-auto object-contain"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {project.technologies?.slice(0, 3).map((tech, index) => (
                          <span key={index} className="text-sm bg-gray-200 px-3 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 3 && (
                          <span className="text-sm text-gray-500 px-3 py-1">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link 
                          href={`/projects/${project.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                          >
                            Live Demo
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
                  <h2 className="text-2xl font-bold mb-4">No projects yet</h2>
                  <p className="text-gray-600 mb-6">
                    Get started by adding your first project!
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    + Add Your First Project
                  </button>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 max-w-md mx-auto mb-8">
                  <h3 className="font-bold text-blue-900 mb-2">🚀 Getting Started:</h3>
                  <ol className="text-blue-800 space-y-1 list-decimal list-inside text-left">
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
