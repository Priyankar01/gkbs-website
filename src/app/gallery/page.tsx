'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import {
	collection,
	getDocs,
	query,
	orderBy,
	limit,
	startAfter,
} from 'firebase/firestore';

export default function Gallery() {
	const [images, setImages] = useState<string[]>([]);
	const [lastVisible, setLastVisible] = useState<any>(null);
	const [hasMore, setHasMore] = useState(true);
	const imagesPerPage = 18;

	// Fetch initial images
	useEffect(() => {
		const fetchInitialImages = async () => {
			try {
				const galleryQuery = query(
					collection(db, 'gallery'),
					orderBy('imageUrl'),
					limit(imagesPerPage)
				);
				const querySnapshot = await getDocs(galleryQuery);

				if (!querySnapshot.empty) {
					setImages(querySnapshot.docs.map((doc) => doc.data().imageUrl));
					setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
				} else {
					setHasMore(false);
				}
			} catch (error) {
				console.error('Error fetching gallery images:', error);
			}
		};
		fetchInitialImages();
	}, []);

	// Load more images
	const fetchMoreImages = async () => {
		if (!lastVisible) return;

		try {
			const galleryQuery = query(
				collection(db, 'gallery'),
				orderBy('imageUrl'),
				startAfter(lastVisible),
				limit(imagesPerPage)
			);
			const querySnapshot = await getDocs(galleryQuery);

			if (!querySnapshot.empty) {
				setImages((prev) => [
					...prev,
					...querySnapshot.docs.map((doc) => doc.data().imageUrl),
				]);
				setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.error('Error fetching more images:', error);
		}
	};

	return (
		<main className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
			{/* Hero Section */}
			<section className="text-center">
				<h1 className="text-4xl font-bold text-red-700">Gallery</h1>
				<p className="mt-2 text-lg">
					A glimpse of our past events and celebrations.
				</p>
			</section>

			{/* Image Grid */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-red-700 text-center">
					Photo Gallery
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
					{images.length > 0 ? (
						images.map((imageUrl, index) => (
							<div
								key={index}
								className="relative w-full h-40 bg-gray-300 rounded overflow-hidden shadow-md hover:scale-110 transition-all duration-200">
								<img
									src={imageUrl}
									alt={`Gallery Image ${index + 1}`}
									className="w-full h-full object-cover"
								/>
							</div>
						))
					) : (
						<p className="text-center text-gray-600 col-span-full">
							No images available.
						</p>
					)}
				</div>

				{/* Load More Button */}
				{hasMore ? (
					<div className="flex justify-center mt-6">
						<button
							onClick={fetchMoreImages}
							className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700 transition">
							Load More
						</button>
					</div>
				) : (
					<p className="text-center text-gray-500 mt-4">
						🎉 You&apos;ve reached the end of the gallery! 🎉
					</p>
				)}
			</section>
		</main>
	);
}
