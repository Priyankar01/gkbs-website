'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Events() {
	interface EventData {
		id: string;
		title: string;
		description: string;
		date: { seconds: number };
		imageUrl?: string;
	}

	const [upcomingEvents, setUpcomingEvents] = useState<EventData[]>([]);
	const [pastEvents, setPastEvents] = useState<EventData[]>([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const eventsQuery = query(
					collection(db, 'events'),
					orderBy('date', 'desc')
				);
				const querySnapshot = await getDocs(eventsQuery);

				const now = new Date();
				const upcoming: EventData[] = [];
				const past: EventData[] = [];

				querySnapshot.docs.forEach((doc) => {
					const event = { id: doc.id, ...doc.data() } as EventData;
					console.log('Fetched Event:', event);

					// Ensure event.date.seconds exists
					const eventDate = event.date?.seconds
						? new Date(event.date.seconds * 1000)
						: new Date();

					if (eventDate > now) {
						upcoming.push(event);
					} else {
						past.push(event);
					}
				});

				setUpcomingEvents(upcoming);
				setPastEvents(past);
			} catch (error) {
				console.error('Error fetching events:', error);
			}
		};
		fetchEvents();
	}, []);

	return (
		<main className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
			{/* Hero Section */}
			<section className="text-center">
				<h1 className="text-4xl font-bold text-red-700">Events</h1>
				<p className="mt-2 text-lg">
					Stay updated with our latest community events.
				</p>
			</section>

			{/* Upcoming Events */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-red-700">Upcoming Events</h2>
				{upcomingEvents.length > 0 ? (
					upcomingEvents.map((event) => (
						<div
							key={event.id}
							className="border rounded-lg p-4 shadow-md mb-6">
							{event.imageUrl ? (
								<img
									src={event.imageUrl}
									alt={event.title}
									className="w-full h-48 object-cover rounded mb-4"
								/>
							) : (
								<p className="text-gray-500 text-sm">No image available</p>
							)}
							<h3 className="text-xl font-bold text-red-600">{event.title}</h3>
							<p className="text-gray-500 text-sm">
								{event.date?.seconds
									? new Date(event.date.seconds * 1000).toLocaleDateString()
									: 'Unknown Date'}
							</p>
							<p className="mt-2">{event.description}</p>
						</div>
					))
				) : (
					<p className="text-center text-gray-600">No upcoming events.</p>
				)}
			</section>

			{/* Past Events */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-red-700">Past Events</h2>
				{pastEvents.length > 0 ? (
					pastEvents.map((event) => (
						<div
							key={event.id}
							className="border rounded-lg p-4 shadow-md mb-6">
							{event.imageUrl ? (
								<img
									src={event.imageUrl}
									alt={event.title}
									className="w-full h-48 object-cover rounded mb-4"
								/>
							) : (
								<p className="text-gray-500 text-sm">No image available</p>
							)}
							<h3 className="text-xl font-bold text-red-600">{event.title}</h3>
							<p className="text-gray-500 text-sm">
								{event.date?.seconds
									? new Date(event.date.seconds * 1000).toLocaleDateString()
									: 'Unknown Date'}
							</p>
							<p className="mt-2">{event.description}</p>
						</div>
					))
				) : (
					<p className="text-center text-gray-600">No past events.</p>
				)}
			</section>
		</main>
	);
}
