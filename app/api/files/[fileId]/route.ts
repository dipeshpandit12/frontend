import { NextRequest, NextResponse } from 'next/server';
import { getFileFromGridFS } from '@/lib/gridfs';

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;

    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    const fileData = await getFileFromGridFS(fileId);

    if (!fileData) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of fileData.stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Return file with appropriate headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': fileData.contentType,
        'Content-Length': fileData.length.toString(),
        'Content-Disposition': `inline; filename="${fileData.filename}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: unknown) {
    console.error('File serve error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
