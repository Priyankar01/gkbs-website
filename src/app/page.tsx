'use client';
import { db } from '@/utils/firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Announcement {
	id: string;
	title: string;
	description: string;
	createdAt: { seconds: number }; // Firestore timestamp
}

export default function Home() {
	const [announcements, setAnnouncements] = useState<Announcement[]>([]);

	useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				const announcementsQuery = query(
					collection(db, 'announcements'),
					orderBy('createdAt', 'desc')
				);
				const querySnapshot = await getDocs(announcementsQuery);

				console.log('Fetched announcements count:', querySnapshot.docs.length); //display the fetched items

				const fetchedAnnouncements: Announcement[] = querySnapshot.docs.map(
					(doc) => {
						const data = doc.data() as Omit<Announcement, 'id'>; // Exclude 'id' from data
						return {
							id: doc.id,
							...data,
						};
					}
				);

				console.log('Fetched Announcements:', fetchedAnnouncements);
				setAnnouncements(fetchedAnnouncements);
			} catch (error) {
				console.error('Error fetching announcements:', error);
			}
		};

		fetchAnnouncements();
	}, []);

	return (
		<main className="w-full">
			{/* Hero Section */}
			<section className="relative w-full h-screen flex items-end justify-center text-center pb-30">
				{/* Background Image with Blur */}
				<div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center brightness-50 blur-xs -z-10"></div>

				{/* Text Overlay */}
				<div className="relative z-10 text-white px-6">
					<h1 className="text-5xl font-extrabold">
						Ghaziabad Kali Bari Samity
					</h1>
					<p className="mt-4 text-lg max-w-3xl mx-auto">
						A spiritual and cultural destination for devotion, festivals, and
						community service.
					</p>
					<Link href="/about">
						<button className="mt-6 px-8 py-3 bg-[#EF233C] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-white hover:text-black hover:cursor-pointer transition duration-200 border-1">
							Know More
						</button>
					</Link>
				</div>
			</section>

			<section className="max-w-6xl mx-auto px-6 py-16">
				{/* Event Carousel */}
				<section className="py-16 max-w-6xl ">
					<h2 className="text-3xl font-bold text-red-700">Upcoming Events</h2>
				</section>

				{/* Announcements Section */}
				<section className=" p-4  mb-6">
					<h2 className="text-2xl font-bold text-red-600 mb-4">
						Announcements
					</h2>
					{announcements.length > 0 ? (
						<ul className="bg-red-100 shadow-md rounded-lg   pl-2">
							{announcements.map((announcement) => (
								<li
									key={announcement.id}
									className=" py-4 flex items-center gap-2">
									<h3 className="text-lg font-semibold">
										{announcement.title}
									</h3>
									<p className="text-sm text-gray-400">
										{new Date(
											announcement.createdAt.seconds * 1000
										).toLocaleDateString()}
									</p>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-500">No announcements available.</p>
					)}
				</section>
			</section>
		</main>
	);
}
