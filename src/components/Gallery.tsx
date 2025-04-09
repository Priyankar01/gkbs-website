import { db } from '@/utils/firebaseConfig';
import { collection, getDocs, query, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Images {
	id: string;
	imageUrl: string;
}
export default function Gallery() {
	const router = useRouter();
	const [images, setImages] = useState<Images[]>([]);

	// To Fetch the images from gallery
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
		<>
			<CldUploadButton
				uploadPreset="gkbs-preset"
				onSuccess={async (result) => {
					try {
						if (!result.info || !result.info?.secure_url) {
							console.error('Upload result does not contain expected info.');
							return;
						}

						const url = result.info?.secure_url;
						await addDoc(collection(db, 'gallery'), {
							imageUrl: url,
						});
					} catch (error) {
						console.error('Error uploading image:', error);
					}
				}}
				className="mt-6 px-8 py-3 bg-[#EF233C] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-white hover:text-black hover:cursor-pointer transition duration-200 border-1"
			/>
			<section>
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
			</section>
		</>
	);
}
