import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-12 leading-tight text-gray-100">About Me</h1>
        
        <div className="bg-purple-900/40 rounded-lg shadow-lg p-6 md:p-10 mb-8 border border-purple-700/40">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start mb-8">
            {/* Profile photo */}
            <Image 
              src="/Headshot.jpg"
              alt="Jaylen Marshall"
              width={300}
              height={300}
              className="w-40 md:w-72 h-40 md:h-72 rounded-full border-4 border-purple-600/30 flex-shrink-0 object-cover"
            />
            
            {/* Bio */}
            <div className="flex-1 space-y-4 text-gray-200 text-lg leading-relaxed">
              <p>
                I&apos;m a motivated Front-End Engineer currently in my LiftOff year at Launchpad, where I&apos;m gaining hands-on experience in Front-End web development.
              </p>
              <p>
                What drives me is the challenge of turning ideas into clean, functional, and user-friendly web applications. Through Launchpad, I&apos;ve been developing projects using tech languages like HTML, CSS, JavaScript, React and Next.js, while applying agile practices, version control (Git/GitHub), and problem-solving strategies that mirror real-world development environments.
              </p>
              <p>
                I&apos;m continuously learning and refining my craft, not just to write code, but to write maintainable, scalable solutions that make a real impact. Looking ahead, I&apos;m eager to grow into a Front-End developer role, where I can collaborate with teams, learn from experienced engineers, and contribute to projects that push my skills and creativity even further.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-purple-900/40 rounded-lg shadow-lg p-8 md:p-10 border border-purple-700/40">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-3">
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">JavaScript</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">Python</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">React</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">Next.js</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">CSS</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">HTML</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">Git/GitHub</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">Node.js</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">Express.js</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">MySQL</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">Vite</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">npm</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">JSON</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">VS Code</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">Vercel</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">Figma</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">Notion</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">Slack</span>
            <span className="bg-purple-800/60 text-purple-100 px-4 py-2 rounded-full border border-purple-600/40">REST APIs</span>
          </div>
        </div>
      </div>
    </div>
  )
}
