import { Client, Databases, ID } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const databases = new Databases(client);

// Collection IDs - Set these in your .env file
export const CONTACTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONTACTS_COLLECTION_ID || 'contacts_collection_id';
export const CONTRIBUTIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONTRIBUTIONS_COLLECTION_ID || 'contributions_collection_id';
export const FILES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID || 'files_collection_id';

// Database ID
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

// Helper function to generate unique IDs
export { ID };