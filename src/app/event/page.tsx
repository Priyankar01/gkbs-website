'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Events() {
	const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
	const [pastEvents, setPastEvents] = useState<any[]>([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const eventsQuery = query(
					collection(db, 'events'),
					orderBy('date', 'desc')
				);
				const querySnapshot = await getDocs(eventsQuery);

				const now = new Date();
				const upcoming = [];
				const past = [];

				querySnapshot.docs.forEach((doc) => {
					const event = { id: doc.id, ...doc.data() };
					console.log('Fetched Event:', event); // Log all event data
					const eventDate = new Date(event.date.seconds * 1000);

					if (eventDate > now) {
						upcoming.push(event);
					} else {
						past.push(event);
					}
				});

				console.log('Upcoming Events:', upcoming); // Debug upcoming events
				console.log('Past Events:', past); // Debug past events

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
				<h2 className="text-2xl font-semibold text-red-700">Past Events</h2>
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
									onLoad={() => console.log('Image Loaded:', event.imageUrl)}
									onError={() =>
										console.error('Image Load Failed:', event.imageUrl)
									}
								/>
							) : (
								<p className="text-gray-500 text-sm">No image available</p>
							)}

							<h3 className="text-xl font-bold text-red-600">{event.title}</h3>
							<p className="text-gray-500 text-sm">
								{new Date(event.date.seconds * 1000).toLocaleDateString()}
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
									onLoad={() => console.log('Image Loaded:', event.imageUrl)}
									onError={() =>
										console.error('Image Load Failed:', event.imageUrl)
									}
								/>
							) : (
								<p className="text-gray-500 text-sm">No image available</p>
							)}

							<h3 className="text-xl font-bold text-red-600">{event.title}</h3>
							<p className="text-gray-500 text-sm">
								{new Date(event.date.seconds * 1000).toLocaleDateString()}
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
