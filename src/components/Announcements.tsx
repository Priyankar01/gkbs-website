'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface Announcement {
	id: string;
	title: string;
	description: string;
	createdAt: any; // Store raw Firestore timestamp initially
}

export default function Announcements() {
	const [announcements, setAnnouncements] = useState<Announcement[]>([]);

	useEffect(() => {
		const fetchAnnouncements = async () => {
			const querySnapshot = await getDocs(collection(db, 'announcements'));
			const data = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				title: doc.data().title,
				description: doc.data().description,
				createdAt: doc.data().createdAt, // Keep Firestore Timestamp as is
			}));

			setAnnouncements(data);
		};

		fetchAnnouncements();
	}, []);

	return (
		<div>
			<h2 className="text-2xl font-bold">Manage Announcements</h2>
			<ul className="mt-4">
				{announcements.map((announcement) => (
					<li key={announcement.id} className="border-b py-2">
						<h3 className="font-semibold">{announcement.title}</h3>
						<p>{announcement.description}</p>
						<small className="text-gray-500">
							Created:{' '}
							{announcement.createdAt?.seconds
								? new Date(
										announcement.createdAt.seconds * 1000
								  ).toLocaleString()
								: 'Unknown Date'}
						</small>
					</li>
				))}
			</ul>
		</div>
	);
}
