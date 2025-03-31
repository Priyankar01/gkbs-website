import { useState, useEffect } from 'react';
import GalleryUpload from '@/components/Upload';

const AdminGallery = () => {
	const [images, setImages] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	// const [page, setPage] = useState(1);

	useEffect(() => {
		fetchImages();
	}, []);

	const fetchImages = async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/gallery?page=${page}`);
			const data = await res.json();
			setImages((prev) => [...prev, ...data.images]);
		} catch (error) {
			console.error('Error fetching images:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-4">Admin Gallery</h2>

			{/* Image Upload Section */}
			<GalleryUpload />

			{/* Image Gallery */}
			<div className="grid grid-cols-3 gap-4 mt-4">
				{images.map((img, index) => (
					<img
						key={index}
						src={img}
						alt="Gallery Image"
						className="w-full h-auto rounded-lg"
					/>
				))}
			</div>

			{/* Load More Button */}
			<div className="mt-4 flex justify-center">
				<button
					onClick={fetchImages}
					disabled={loading}
					className="px-4 py-2 bg-blue-500 text-white rounded">
					{loading ? 'Loading...' : 'Load More'}
				</button>
			</div>
		</div>
	);
};

export default AdminGallery;
