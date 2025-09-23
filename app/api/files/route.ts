import { NextRequest, NextResponse } from 'next/server';
import { databases, DATABASE_ID, FILES_COLLECTION_ID, ID } from '@/lib/appwrite';

export interface FileRecord {
  name: string;
  original_name: string;
  type: 'image' | 'video' | 'csv';
  size: number;
  url: string;
  public_id: string;
  cloudinary_url: string;
  uploaded_by: string;
  contribution_id?: string;
  upload_date: string;
  status: 'active' | 'deleted';
}

export async function POST(request: NextRequest) {
  try {
    const body: Omit<FileRecord, 'upload_date' | 'status'> = await request.json();

    // Validate required fields
    const { name, original_name, type, size, url, public_id, cloudinary_url, uploaded_by } = body;
    if (!name || !original_name || !type || !size || !url || !public_id || !cloudinary_url || !uploaded_by) {
      console.error('Missing required fields in file record');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }


    // Create file record in Appwrite
    const document = await databases.createDocument(
      DATABASE_ID,
      FILES_COLLECTION_ID,
      ID.unique(),
      {
        name,
        original_name,
        type,
        size,
        url,
        public_id,
        cloudinary_url,
        uploaded_by,
        contribution_id: body.contribution_id || null,
        upload_date: new Date().toISOString(),
        status: 'active',
      }
    );

    return NextResponse.json(
      { success: true, data: document },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating file record:', error);
    return NextResponse.json(
      { error: 'Failed to create file record' },
      { status: 500 }
    );
  }
}