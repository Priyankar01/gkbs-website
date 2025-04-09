'use client';
import { db } from '@/utils/firebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Images {
	id: string;
	imageUrl: string;
}
export default function Gallery() {
	const [images, setImages] = useState<Images[]>([]);
	useEffect(() => {
		const fetchImages = async () => {
			try {
				const imagesQuery = query(
					collection(db, 'gallery')
					// orderBy('id', 'imageUrl')
				);
				const querySnapshot = await getDocs(imagesQuery);

				console.log('Fetched images count:', querySnapshot.docs.length); //display the fetched items

				const fetchedImages: Images[] = querySnapshot.docs.map((doc) => {
					const data = doc.data() as Omit<Images, 'id'>; // Exclude 'id' from data
					return {
						id: doc.id,
						...data,
					};
				});

				console.log('Fetched Images:', fetchedImages);
				setImages(fetchedImages);
			} catch (error) {
				console.error('Error fetching announcements:', error);
			}
		};

		fetchImages();
	}, []);

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
						<ul className="bg-red-100 shadow-md rounded-lg pl-2">
							{images.map((image) => (
								<li key={image.id} className=" py-4 flex items-center gap-2">
									<Image
										src={image.imageUrl}
										width={500}
										height={500}
										alt="Picture of the author"
									/>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-500">No Images available.</p>
					)}
				</div>
			</section>
		</main>
	);
}
