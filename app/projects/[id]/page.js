import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProjectDetail({ params }) {
  const { id } = params;

  // Fetch the specific project from the API
  let project = null;
  
  try {
    // Use relative path for both local and production
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/projects/${id}`, {
      cache: 'no-store' // Ensure fresh data on each request
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error('Failed to fetch project');
    }
    
    project = await response.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    // If it's not a 404, we'll show the placeholder state
    if (error.message !== 'NEXT_NOT_FOUND') {
      project = null;
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Project Not Implemented</h1>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 max-w-md mx-auto">
            <h2 className="font-bold text-blue-900 mb-4">🚀 To view project details:</h2>
            <ol className="text-blue-800 space-y-2 list-decimal list-inside text-left">
              <li>Implement the GET /api/projects/[id] endpoint</li>
              <li>Create and seed your database with projects</li>
              <li>Update this page to fetch from the API</li>
            </ol>
          </div>
          <Link 
            href="/projects" 
            className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // This code will run once students implement the API
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link 
          href="/projects" 
          className="inline-flex items-center text-purple-400 hover:text-pink-400 mb-8 transition-colors duration-300"
        >
          ← Back to Projects
        </Link>

        {/* Project header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 text-gray-100">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, index) => (
              <span key={index} className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project image */}
        {project.imageUrl && (
          <div className="mb-8 flex justify-center">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={400}
              className="w-full sm:max-w-2xl rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Project content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-4 text-gray-100">About This Project</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project links */}
            <div className="bg-purple-900/40 border border-purple-700/40 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-100">Project Links</h3>
              <div className="space-y-3">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-purple-600 text-white text-center px-4 py-3 rounded hover:bg-purple-700 hover:scale-105 transition-all duration-300"
                  >
                    View Live Project
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-purple-800 text-white text-center px-4 py-3 rounded hover:bg-purple-900 hover:scale-105 transition-all duration-300"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Project info */}
            <div className="bg-purple-900/40 border border-purple-700/40 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-100">Project Info</h3>
              <div className="space-y-2 text-sm text-gray-300">
                {project.projectCreated && (
                  <p><strong className="text-gray-200">Project Created:</strong> {project.projectCreated}</p>
                )}
                {project.lastUpdate && (
                  <p><strong className="text-gray-200">Last Update:</strong> {project.lastUpdate}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}