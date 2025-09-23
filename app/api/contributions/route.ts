import { NextRequest, NextResponse } from 'next/server';
import { databases, DATABASE_ID, CONTRIBUTIONS_COLLECTION_ID, FILES_COLLECTION_ID, ID } from '@/lib/appwrite';
import { Contribution } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
        const body: Omit<Contribution, 'status' | 'has_files'> & { files?: Array<{ url: string; public_id: string; type: string; name: string; file_record_id?: string }> } = await request.json();

    // Validate required fields
    const { sign_name, language, category, description, contributor_name, contributor_email } = body;
    if (!sign_name || !language || !category || !description || !contributor_name || !contributor_email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create document in Appwrite
    const document = await databases.createDocument(
      DATABASE_ID,
      CONTRIBUTIONS_COLLECTION_ID,
      ID.unique(),
      {
        sign_name,
        language,
        category,
        description,
        regional_variation: body.regional_variation || null,
        contributor_name,
        contributor_email,
        status: 'pending',
        has_files: body.files && body.files.length > 0,
        file_ids: body.files?.map(f => f.file_record_id).filter(Boolean) || [], // Store file record IDs (may be empty if DB records failed)
      }
    );

    // Update file records with contribution ID (only for files that have database records)
    if (body.files && body.files.length > 0) {
      for (const file of body.files) {
        if (file.file_record_id) {
          try {
            await databases.updateDocument(
              DATABASE_ID,
              FILES_COLLECTION_ID,
              file.file_record_id,
              {
                contribution_id: document.$id,
              }
            );
          } catch (error) {
            console.error(`Failed to update file record ${file.file_record_id}:`, error);
          }
        }
      }
    }

    return NextResponse.json(
      { success: true, data: document },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contribution:', error);
    return NextResponse.json(
      { error: 'Failed to create contribution' },
      { status: 500 }
    );
  }
}