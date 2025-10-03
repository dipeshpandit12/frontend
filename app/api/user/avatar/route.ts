import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { uploadFileToGridFS, deleteFileFromGridFS } from '@/lib/gridfs';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let decoded: any;

    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image.' },
        { status: 400 }
      );
    }

    // Validate file size (2MB limit for avatars)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 2MB for avatars.' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete old avatar if exists
    if (user.avatarFileId) {
      await deleteFileFromGridFS(user.avatarFileId);
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload new avatar to GridFS
    const result = await uploadFileToGridFS(
      buffer,
      `avatar_${user._id}_${Date.now()}_${file.name}`,
      file.type,
      {
        folder: 'avatars',
        userId: user._id,
        originalName: file.name,
        size: file.size,
      }
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    // Update user with new avatar file ID
    user.avatarFileId = result.fileId!.toString();
    await user.save();

    return NextResponse.json(
      {
        message: 'Avatar updated successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatarFileId: user.avatarFileId,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Avatar update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}