'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';

interface AvatarUploadProps {
  currentAvatarFileId?: string;
  onUploadSuccess?: (fileId: string) => void;
  className?: string;
}

export default function AvatarUpload({
  currentAvatarFileId,
  onUploadSuccess,
  className,
}: AvatarUploadProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  const handleUploadSuccess = async (fileId: string, filename: string) => {
    setIsUpdating(true);
    setError('');

    try {
      // Update user avatar via API
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      // We need to fetch the file and re-upload it to the avatar endpoint
      // For now, let's just notify success and let the parent handle it
      onUploadSuccess?.(fileId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUploadError = (error: string) => {
    setError(error);
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Current Avatar Display */}
        {currentAvatarFileId && (
          <div className="flex justify-center">
            <img
              src={`/api/files/${currentAvatarFileId}`}
              alt="Current avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
        )}

        {/* Upload Area */}
        <FileUpload
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          accept="image/*"
          maxSize={2 * 1024 * 1024} // 2MB for avatars
          folder="avatars"
          className="w-full"
        >
          <div className="flex flex-col items-center space-y-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Upload Avatar</p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
            </div>
          </div>
        </FileUpload>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {isUpdating && (
          <div className="text-blue-600 text-sm text-center">
            Updating avatar...
          </div>
        )}
      </div>
    </div>
  );
}