import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
   const projects = await prisma.project.findMany({
     orderBy: { createdAt: 'desc' }
   });
   return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Parse the request body to get project data
    const body = await request.json();
    const { title, description, imageUrl, projectUrl, githubUrl, technologies } = body;
    
    // Validate required fields before creating
    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    
    if (!description || !description.trim()) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }
    
    if (!technologies || !Array.isArray(technologies) || technologies.length === 0) {
      return NextResponse.json(
        { error: 'At least one technology is required' },
        { status: 400 }
      );
    }
    
    // Use prisma.project.create() to create a new project
    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl || null,
        projectUrl: projectUrl || null,
        githubUrl: githubUrl || null,
        technologies
      }
    });
    
    // Return the created project as JSON
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}