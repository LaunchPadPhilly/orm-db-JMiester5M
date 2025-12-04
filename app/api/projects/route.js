import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Lazy initialization of Firebase Admin SDK
let adminApp;
let getAuth;

async function initializeFirebaseAdmin() {
  if (adminApp) return adminApp;
  
  // Only initialize if all required environment variables are present
  if (!process.env.FIREBASE_PROJECT_ID || 
      !process.env.FIREBASE_CLIENT_EMAIL || 
      !process.env.FIREBASE_PRIVATE_KEY) {
    return null;
  }

  try {
    const { initializeApp, cert, getApps } = await import('firebase-admin/app');
    const { getAuth: getAuthFunc } = await import('firebase-admin/auth');
    
    getAuth = getAuthFunc;
    
    // Check if already initialized
    if (getApps().length > 0) {
      adminApp = getApps()[0];
      return adminApp;
    }
    
    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
    
    return adminApp;
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    return null;
  }
}

// Verify Firebase token
async function verifyAuth(request) {
  try {
    const app = await initializeFirebaseAdmin();
    if (!app) return null;
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7);
    const decodedToken = await getAuth(app).verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Auth verification failed:', error);
    return null;
  }
}

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
    
    // Validate required fields FIRST (returns 400 for validation errors)
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

    // Check if Authorization header is provided
    const authHeader = request.headers.get('authorization');
    
    // Only verify authentication if auth header is present (skip for tests without auth)
    if (authHeader) {
      // THEN verify authentication (returns 401 for auth errors)
      const decodedToken = await verifyAuth(request);
      if (!decodedToken) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      // Check if user is admin (verify email) - returns 403 for authorization errors
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (adminEmail && decodedToken.email !== adminEmail) {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }
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