'use client';
import { useState } from 'react';

const GalleryUpload = () => {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);

	const handleUpload = async () => {
		if (!file) return alert('Please select a file');

		setUploading(true);
		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			const data = await res.json();
			console.log('Uploaded:', data);

			if (data.secure_url) {
				alert('Upload successful!');
			} else {
				alert('Upload failed');
			}
		} catch (error) {
			console.error('Upload error', error);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div>
			<input
				type="file"
				onChange={(e) => setFile(e.target.files?.[0] || null)}
			/>
			<button onClick={handleUpload} disabled={uploading}>
				{uploading ? 'Uploading...' : 'Upload'}
			</button>
		</div>
	);
};

export default GalleryUpload;
