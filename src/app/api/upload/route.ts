import { NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary';

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const file = formData.get('file') as Blob | null;

		if (!file) {
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
		}

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ folder: 'gkbs_gallery' }, (error, result) => {
					if (error) reject(error);
					else resolve(result);
				})
				.end(buffer);
		});

		return NextResponse.json(uploadResult);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
	}
}
