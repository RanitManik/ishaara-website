import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    // Check if environment variables are loaded
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary environment variables not loaded')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const uploadedBy = formData.get('uploaded_by') as string;


    if (!file) {
      console.error('No file provided')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!uploadedBy) {
      console.error('Uploaded by user is required')
      return NextResponse.json({ error: 'Uploaded by user is required' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine resource type based on file type
    let resourceType: 'image' | 'video' | 'raw' = 'raw';
    if (file.type.startsWith('image/')) {
      resourceType = 'image';
    } else if (file.type.startsWith('video/')) {
      resourceType = 'video';
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          folder: 'ishaara-contributions',
          public_id: `${Date.now()}-${file.name}`,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            reject(error)
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    const cloudinaryResult = result as any;

    const fileRecordResponse = await fetch(`${request.nextUrl.origin}/api/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cloudinaryResult.public_id,
        original_name: file.name,
        type: resourceType === 'raw' ? 'csv' : resourceType,
        size: file.size,
        url: cloudinaryResult.secure_url,
        public_id: cloudinaryResult.public_id,
        cloudinary_url: cloudinaryResult.secure_url,
        uploaded_by: uploadedBy,
      }),
    });

    if (!fileRecordResponse.ok) {
      const errorText = await fileRecordResponse.text();
      console.error('Failed to create file record in Appwrite:', errorText);
    }

    const fileRecord = fileRecordResponse.ok ? await fileRecordResponse.json() : null;

    return NextResponse.json({
      success: true,
      url: cloudinaryResult.secure_url,
      public_id: cloudinaryResult.public_id,
      resource_type: resourceType,
      file_record_id: fileRecord?.data?.$id,
    }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}