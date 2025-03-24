'use client';

export default function Events() {
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
					<p className="text-gray-500">No upcoming events.</p>
				</div>
			</section>

			{/* Past Events */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-red-700">Previous Events</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
					<p className="text-gray-500">No past events.</p>
				</div>
			</section>
		</main>
	);
}
