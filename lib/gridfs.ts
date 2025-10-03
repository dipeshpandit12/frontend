import mongoose from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';
import dbConnect from './mongodb';

let bucket: GridFSBucket | null = null;

export const getGridFSBucket = async () => {
  if (!bucket) {
    await dbConnect();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    bucket = new GridFSBucket(db, { bucketName: 'uploads' });
  }
  return bucket;
};

export const uploadFileToGridFS = async (
  file: Buffer,
  filename: string,
  contentType: string,
  metadata?: Record<string, unknown>
): Promise<{ success: boolean; fileId?: ObjectId; error?: string }> => {
  try {
    const bucket = await getGridFSBucket();
    
    return new Promise((resolve) => {
      const uploadStream = bucket.openUploadStream(filename, {
        contentType,
        metadata: {
          ...metadata,
          uploadDate: new Date(),
        },
      });

      uploadStream.on('finish', () => {
        resolve({
          success: true,
          fileId: uploadStream.id as ObjectId,
        });
      });

      uploadStream.on('error', (error) => {
        console.error('GridFS upload error:', error);
        resolve({
          success: false,
          error: 'Failed to upload file',
        });
      });

      uploadStream.end(file);
    });
  } catch (error) {
    console.error('GridFS upload error:', error);
    return {
      success: false,
      error: 'Failed to upload file',
    };
  }
};

export const getFileFromGridFS = async (fileId: string | ObjectId) => {
  try {
    const bucket = await getGridFSBucket();
    const objectId = typeof fileId === 'string' ? new ObjectId(fileId) : fileId;
    
    // Check if file exists
    const files = await bucket.find({ _id: objectId }).toArray();
    if (files.length === 0) {
      return null;
    }

    const file = files[0];
    const downloadStream = bucket.openDownloadStream(objectId);

    return {
      stream: downloadStream,
      contentType: file.contentType || 'application/octet-stream',
      filename: file.filename,
      length: file.length,
    };
  } catch (error) {
    console.error('GridFS download error:', error);
    return null;
  }
};

export const deleteFileFromGridFS = async (fileId: string | ObjectId) => {
  try {
    const bucket = await getGridFSBucket();
    const objectId = typeof fileId === 'string' ? new ObjectId(fileId) : fileId;
    
    await bucket.delete(objectId);
    return { success: true };
  } catch (error) {
    console.error('GridFS delete error:', error);
    return {
      success: false,
      error: 'Failed to delete file',
    };
  }
};

export const getFileInfoFromGridFS = async (fileId: string | ObjectId) => {
  try {
    const bucket = await getGridFSBucket();
    const objectId = typeof fileId === 'string' ? new ObjectId(fileId) : fileId;
    
    const files = await bucket.find({ _id: objectId }).toArray();
    return files.length > 0 ? files[0] : null;
  } catch (error) {
    console.error('GridFS info error:', error);
    return null;
  }
};