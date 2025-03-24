'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
	const [upcomingEvents, setUpcomingEvents] = useState([]);

	useEffect(() => {
		fetch('/data.json')
			.then((res) => res.json())
			.then((data) => {
				const currentDate = new Date();
				const upcoming = data.events.filter(
					(event) => new Date(event.date) >= currentDate
				);
				setUpcomingEvents(upcoming);
			});
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
						<button className="mt-6 px-8 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-white hover:text-black hover:cursor-pointer transition duration-200 border-1">
							Know More
						</button>
					</Link>
				</div>
			</section>

			{/* Rest of the content can stay inside a container */}
			<section className="max-w-6xl mx-auto px-6 py-16">
				{/* Event Carousel */}
				<section className="py-16 max-w-6xl ">
					<h2 className="text-3xl font-bold text-red-700">Upcoming Events</h2>
					<div className="overflow-x-auto whitespace-nowrap scrollbar-hide flex space-x-6 mt-6 p-4">
						{upcomingEvents.length > 0 ? (
							upcomingEvents.map((event) => (
								<div
									key={event.id}
									className="bg-white shadow-lg rounded-lg p-4 min-w-[280px] flex-none border border-gray-200 hover:shadow-xl transition duration-300">
									<img
										src={event.image}
										alt={event.title}
										className="w-full h-40 object-cover rounded-md"
									/>
									<h3 className="text-lg font-semibold mt-3 text-gray-800">
										{event.title}
									</h3>
									<p className="text-sm text-gray-600">{event.date}</p>
								</div>
							))
						) : (
							<p className="text-gray-500">No upcoming events.</p>
						)}
					</div>
				</section>

				{/* Announcements Section */}
				<section className="py-16 max-w-6xl ">
					<h2 className="text-3xl font-bold text-red-700">Announcements</h2>
					<div className="bg-gray-100 p-6 mt-6 h-40 overflow-y-auto space-y-3 rounded-lg shadow-md border border-gray-200">
						<div className="border-b pb-2 text-gray-700">
							🔔 Temple will remain open till 10 PM during Durga Puja.
						</div>
						<div className="border-b pb-2 text-gray-700">
							📢 Community meeting scheduled for next Sunday.
						</div>
						<div className="border-b pb-2 text-gray-700">
							🛕 Special prayer session on Ekadashi.
						</div>
						<div className="border-b pb-2 text-gray-700">
							🎉 Annual cultural program next month.
						</div>
						<div className="border-b pb-2 text-gray-700">
							🙏 Free health check-up camp at the temple on Saturday.
						</div>
						<div className="text-red-600 hover:underline cursor-pointer font-medium">
							View all announcements →
						</div>
					</div>
				</section>
			</section>
		</main>
	);
}
