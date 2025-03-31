'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface Event {
	id: string;
	title: string;
	description: string;
	date: any; // Keep Firestore timestamp as is
}

export default function Events() {
	const [events, setEvents] = useState<Event[]>([]);

	useEffect(() => {
		const fetchEvents = async () => {
			const querySnapshot = await getDocs(collection(db, 'events'));
			const data = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				title: doc.data().title,
				description: doc.data().description,
				date: doc.data().date, // Store raw timestamp from Firestore
			}));

			setEvents(data);
		};

		fetchEvents();
	}, []);

	return (
		<div>
			<h2 className="text-2xl font-bold">Manage Events</h2>
			<ul className="mt-4">
				{events.map((event) => (
					<li key={event.id} className="border-b py-2">
						<h3 className="font-semibold">{event.title}</h3>
						<p>{event.description}</p>
						<small className="text-gray-500">
							Event Date:{' '}
							{event.date?.seconds
								? new Date(event.date.seconds * 1000).toLocaleString()
								: 'Unknown Date'}
						</small>
					</li>
				))}
			</ul>
		</div>
	);
}
