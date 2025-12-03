const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear existing projects
  await prisma.project.deleteMany();

  // Insert projects with full details from GitHub repos
  await prisma.project.createMany({
    data: [
      {
        title: "Najah - Study Companion",
        description: "A beautiful, feature-rich study companion web application that helps students stay focused, organized, and productive. Combines task management, Pomodoro timers, AI-powered homework assistance, and ambient lofi music to create the perfect study environment.",
        imageUrl: "/najah-logo.png",
        projectUrl: "https://404sleepnotfound.vercel.app",
        githubUrl: "https://github.com/YarScar/404_SleepNotFound2",
        technologies: ["React", "Vite", "React Router", "Gemini API", "JavaScript", "CSS"]
      },
      {
        title: "Formora - Skill Gap Learning",
        description: "A web app that creates AI-powered custom courses to learn specific skills needed for designated occupations. Features course generation, progress tracking, interactive lessons, and AI-generated quizzes to help users bridge their skill gaps.",
        imageUrl: "/formora-logo.png",
        projectUrl: "https://sg-solution.vercel.app",
        githubUrl: "https://github.com/JMiester5M/Formora",
        technologies: ["React", "Vite", "TanStack Query", "Firebase", "OpenAI API", "React Router"]
      },
      {
        title: "Arcania - Minecraft Build Helper",
        description: "An AI-powered React application to help Minecraft players get creative build ideas and block suggestions. Features customizable skill levels, build sizes, AI-generated suggestions using Groq API, and immersive Minecraft-themed UI with sound effects.",
        imageUrl: "/arcania-logo2.png",
        projectUrl: "https://arcania-seven.vercel.app",
        githubUrl: "https://github.com/JMiester5M/Arcania",
        technologies: ["React", "Vite", "Groq API", "JavaScript", "CSS", "Web Audio API"]
      }
    ]
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });