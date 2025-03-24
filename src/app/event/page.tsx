'use client';
import { useEffect, useState } from 'react';

export default function Events() {
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [pastEvents, setPastEvents] = useState([]);

	useEffect(() => {
		fetch('/data.json')
			.then((res) => res.json())
			.then((data) => {
				const currentDate = new Date();
				const upcoming = data.events.filter(
					(event) => new Date(event.date) >= currentDate
				);
				const past = data.events.filter(
					(event) => new Date(event.date) < currentDate
				);

				setUpcomingEvents(upcoming);
				setPastEvents(past);
			});
	}, []);

	return (
		<main className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
			<h1 className="text-4xl font-bold text-red-700 text-center">
				Our Events
			</h1>
			<p className="mt-2 text-lg text-center">
				Stay updated with our upcoming and past events.
			</p>

			{/* Upcoming Events */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-red-700">Upcoming Events</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
					{upcomingEvents.length > 0 ? (
						upcomingEvents.map((event) => (
							<div
								key={event.id}
								className="bg-gray-200 h-60 p-4 rounded shadow-lg">
								<img
									src={event.image}
									alt={event.title}
									className="w-full h-32 object-cover rounded"
								/>
								<h3 className="text-lg font-semibold mt-2">{event.title}</h3>
								<p className="text-sm text-gray-600">{event.date}</p>
								<p className="text-sm mt-1">{event.description}</p>
							</div>
						))
					) : (
						<p className="text-gray-500">No upcoming events.</p>
					)}
				</div>
			</section>

			{/* Past Events */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-red-700">Previous Events</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
					{pastEvents.length > 0 ? (
						pastEvents.map((event) => (
							<div
								key={event.id}
								className="bg-gray-300 h-60 p-4 rounded shadow-lg">
								<img
									src={event.image}
									alt={event.title}
									className="w-full h-32 object-cover rounded"
								/>
								<h3 className="text-lg font-semibold mt-2">{event.title}</h3>
								<p className="text-sm text-gray-600">{event.date}</p>
								<p className="text-sm mt-1">{event.description}</p>
							</div>
						))
					) : (
						<p className="text-gray-500">No past events.</p>
					)}
				</div>
			</section>
		</main>
	);
}
