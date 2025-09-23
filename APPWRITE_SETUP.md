# Appwrite Integration Setup

This project integrates with Appwrite for backend services including contact forms and community contributions.

## Prerequisites

1. An Appwrite account and project
2. Appwrite CLI installed (optional, for local development)

## Setup Instructions

### 1. Create Collections in Appwrite

Log in to your Appwrite console and create the following collections in your database:

#### Contacts Collection
- **Collection Name**: `contacts`
- **Collection ID**: `contacts` (or note the auto-generated ID)

Attributes:
- `name` (String, Required)
- `email` (String, Required)
- `subject` (String, Required)
- `message` (String, Required)
- `status` (String, Required, Default: "pending")

#### Files Collection
- **Collection Name**: `files`
- **Collection ID**: `files` (or note the auto-generated ID)

Attributes:
- `name` (String, Required)
- `original_name` (String, Required)
- `type` (String, Required) - Values: "image", "video", "csv"
- `size` (Integer, Required)
- `url` (String, Required)
- `public_id` (String, Required)
- `cloudinary_url` (String, Required)
- `uploaded_by` (String, Required)
- `contribution_id` (String, Optional)
- `upload_date` (String, Required)
- `status` (String, Required, Default: "active")

#### Contributions Collection
- **Collection Name**: `contributions`
- **Collection ID**: `contributions` (or note the auto-generated ID)

Attributes:
- `sign_name` (String, Required)
- `language` (String, Required)
- `category` (String, Required)
- `description` (String, Required)
- `regional_variation` (String, Optional)
- `contributor_name` (String, Required)
- `contributor_email` (String, Required)
- `status` (String, Required, Default: "pending")
- `has_files` (Boolean, Required, Default: false)
- `file_ids` (String Array, Optional) - Array of file record IDs

### 2. Update Collection IDs

After creating the collections, update the collection IDs in `lib/appwrite.ts`:

```typescript
export const CONTACTS_COLLECTION_ID = 'your_contacts_collection_id';
export const CONTRIBUTIONS_COLLECTION_ID = 'your_contributions_collection_id';
```

### 3. Configure Permissions

Set appropriate permissions for the collections:
- **Contacts**: Allow `create` for `users` (or `any` for public access)
- **Contributions**: Allow `create` for `users` (or `any` for public access)

### 4. Environment Variables

Ensure your `.env` file contains the correct Appwrite configuration:

```
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_PROJECT_NAME=your_project_name
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-region.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_DATABASE_NAME=your_database_name
```

## API Endpoints

The integration provides the following API endpoints:

- `POST /api/contacts` - Submit a contact form
- `POST /api/contributions` - Submit a contribution

## Usage

The forms in `/support` and `/community` pages are now functional and will submit data to your Appwrite collections.

## File Uploads

Currently, the contribution form includes file upload UI but doesn't handle actual file uploads to Appwrite Storage. To implement file uploads:

1. Create a Storage bucket in Appwrite
2. Update the API routes to handle file uploads
3. Use Appwrite's Storage API to upload files
4. Store file IDs in the contributions collection

## Error Handling

The integration includes basic error handling. Check the browser console and server logs for any issues during setup.