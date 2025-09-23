import { NextRequest, NextResponse } from 'next/server';
import { databases, DATABASE_ID, CONTACTS_COLLECTION_ID, ID } from '@/lib/appwrite';
import { Contact } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: Omit<Contact, 'status'> = await request.json();

    // Validate required fields
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create document in Appwrite
    const document = await databases.createDocument(
      DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      ID.unique(),
      {
        name,
        email,
        subject,
        message,
        status: 'pending',
      }
    );

    return NextResponse.json(
      { success: true, data: document },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}