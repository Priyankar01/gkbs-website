'use client';

import { db } from '@/utils/firebaseConfig';
import {
	collection,
	addDoc,
	serverTimestamp,
	orderBy,
	query,
	getDocs,
	deleteDoc,
	doc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

const EventComponent = () => {
	const [newEvent, setNewEvent] = useState({
		title: '',
		date: '',
		description: '',
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setNewEvent((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await addDoc(collection(db, 'events'), {
				...newEvent,
				date: new Date(newEvent.date),
				createdAt: serverTimestamp(),
			});
			setSuccess(true);
			setNewEvent({ title: '', date: '', description: '' });
		} catch (error) {
			console.error('Error adding event:', error);
		} finally {
			setLoading(false);
		}
	};

	// Logic to display the events
	interface EventData {
		id: string;
		title: string;
		description: string;
		date: { seconds: number };
	}

	const [events, setEvents] = useState<EventData[]>([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const eventsQuery = query(
					collection(db, 'events'),
					orderBy('date', 'desc')
				);
				const querySnapshot = await getDocs(eventsQuery);

				const currentEvent: EventData[] = [];

				querySnapshot.docs.forEach((doc) => {
					const event = { id: doc.id, ...doc.data() } as EventData;
					console.log('Fetched Event:', event);

					// // Ensure event.date.seconds exists
					// const eventDate = event.date?.seconds
					// 	? new Date(event.date.seconds * 1000)
					// 	: new Date();

					currentEvent.push(event);
				});

				setEvents(currentEvent);
			} catch (error) {
				console.error('Error fetching events:', error);
			}
		};
		fetchEvents();
	}, []);

	// Logic to delete an event
	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this announcement?')) return;

		try {
			await deleteDoc(doc(db, 'announcements', id));
			setEvents((prev) => prev.filter((a) => a.id !== id));
		} catch (error) {
			console.error('Error deleting announcement:', error);
		}
	};

	return (
		<>
			{/* To add events */}
			<section>
				<div>
					<form
						onSubmit={handleSubmit}
						className="max-w-sm mx-auto bg-red-100 p-4 rounded-xl mt-3 space-y-4">
						<label className="block mb-1 text-sm font-medium text-gray-900">
							Title
						</label>
						<input
							type="text"
							name="title"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
							placeholder="Enter the title."
							value={newEvent.title}
							onChange={handleChange}
							required
						/>

						<label className="block mb-1 text-sm font-medium text-gray-900">
							Enter Date
						</label>
						<input
							type="datetime-local"
							name="date"
							className="hover:cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
							value={newEvent.date}
							onChange={handleChange}
							required
						/>

						<label className="block mb-1 text-sm font-medium text-gray-900">
							Description
						</label>
						<textarea
							name="description"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
							required
							placeholder="Enter the description"
							value={newEvent.description}
							onChange={handleChange}
						/>

						<button
							className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center hover:cursor-pointer"
							type="submit"
							disabled={loading}>
							{loading ? 'Adding...' : 'Add Event'}
						</button>

						{success && (
							<p className="text-green-600 text-sm mt-2">
								Event added successfully!
							</p>
						)}
					</form>
				</div>
			</section>

			{/* To Modify and Display Events */}
			<section className="mx-auto p-3 mt-3">
				<h2 className="text-2xl font-bold text-red-600 mb-4">Events</h2>
				{events.length > 0 ? (
					<ul className="bg-red-100 shadow-md rounded-lg border-l-1 border-r-1 border-t-1 pl-2">
						{events.map((event) => (
							<li
								key={event.id}
								className="mr-2 py-4 flex items-start flex-col gap-2 border-b-1">
								<div className="flex items-center justify-between w-full">
									<div>
										<h3 className="text-lg font-semibold">{event.title}</h3>
										<p className="text-gray-400 text-sm">
											{event.date?.seconds
												? new Date(
														event.date.seconds * 1000
												  ).toLocaleDateString()
												: 'Unknown Date'}
										</p>
									</div>
									<button
										onClick={() => handleDelete(event.id)}
										className="text-sm text-red-700 font-bold hover:underline hover:cursor-pointer">
										Delete
									</button>
								</div>
								<p className="text-gray-700">{event.description}</p>
							</li>
						))}
					</ul>
				) : (
					<p className="text-center text-gray-600">No upcoming events.</p>
				)}
			</section>
		</>
	);
};

export default EventComponent;
