import Link from 'next/link';

export default function Contact() {
  const contactMethods = [
    {
      name: 'Email',
      icon: '📧',
      url: 'mailto:jmiester765@gmail.com',
      display: 'jmiester765@gmail.com'
    },
    {
      name: 'LinkedIn',
      icon: '🔗',
      url: 'https://www.linkedin.com/in/jaylen-marshall-016325374',
      display: 'linkedin.com/in/jaylen-marshall'
    },
    {
      name: 'GitHub',
      icon: '💻',
      url: 'https://github.com/JMiester5M',
      display: 'github.com/JMiester5M'
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-12 leading-tight text-gray-100 text-center">Get In Touch</h1>
        
        <div className="bg-purple-900/40 rounded-lg shadow-lg p-8 md:p-10 border border-purple-700/40">
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed text-center">
            I&apos;d love to hear from you! Feel free to reach out through any of these channels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.url}
                target={method.name !== 'Email' ? '_blank' : undefined}
                rel={method.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center gap-4 p-6 bg-purple-800/50 rounded-lg border border-purple-700/40 hover:bg-purple-800/70 hover:border-purple-600/60 transition-all duration-300 hover:scale-105 group cursor-pointer"
              >
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <p className="text-xl font-bold text-gray-100 text-center">
                  {method.name}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-green-900/30 border-2 border-green-700/50 rounded-lg p-6 mt-8">
          <h3 className="font-bold text-green-300 mb-2">💡 Connect With Me</h3>
          <p className="text-green-200">
            Choose any of the contact methods above to reach me. I&apos;m always happy to discuss new opportunities, projects, or just chat about web development!
          </p>
        </div>
      </div>
    </div>
  )
}
