'use client';
import { db } from '@/utils/firebaseConfig';
import {
	collection,
	getDocs,
	orderBy,
	query,
	addDoc,
	serverTimestamp,
	doc,
	deleteDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface Announcement {
	id: string;
	title: string;
	description: string;
	createdAt: { seconds: number }; // Firestore timestamp
}

export default function Announcements() {
	const [announcements, setAnnouncements] = useState<Announcement[]>([]);

	// Logic to display the announcements
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

	// Logic to add the announcements
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await addDoc(collection(db, 'announcements'), {
				title,
				description,
				createdAt: serverTimestamp(),
			});
			setSuccess(true);
			setTitle('');
			setDescription('');
		} catch (error) {
			console.error('Error adding announcement: ', error);
		} finally {
			setLoading(false);
		}
	};

	// Logic to delete an announcement
	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this announcement?')) return;

		try {
			await deleteDoc(doc(db, 'announcements', id));
			setAnnouncements((prev) => prev.filter((a) => a.id !== id));
		} catch (error) {
			console.error('Error deleting announcement:', error);
		}
	};

	return (
		<>
			<section className="max-w mx-auto">
				{/* To add announcements */}
				<section>
					<form
						onSubmit={handleSubmit}
						className="max-w-sm mx-auto bg-red-100 p-4 rounded-xl mt-3 space-y-4">
						<div>
							<label className="block mb-1 text-sm font-medium text-gray-900">
								Title
							</label>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
								placeholder="Enter the title."
								required
							/>
						</div>

						<div>
							<label className="block mb-1 text-sm font-medium text-gray-900">
								Description
							</label>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
								required
								placeholder="Enter the description"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center hover:cursor-pointer">
							{loading ? 'Submitting...' : 'Submit'}
						</button>

						{success && (
							<p className="text-green-600 text-sm mt-2">
								Announcement posted!
							</p>
						)}
					</form>
				</section>
				{/* To display announcements */}
				<section className="mx-auto p-3 mt-3">
					<h2 className="text-2xl font-bold text-red-600 mb-4">
						Announcements
					</h2>
					{announcements.length > 0 ? (
						<ul className="bg-red-100 shadow-md rounded-lg border-l-1 border-r-1 border-t-1 pl-2">
							{announcements.map((announcement) => (
								<li
									key={announcement.id}
									className="mr-2 py-4 flex items-start flex-col gap-2 border-b-1">
									<div className="flex items-center justify-between w-full">
										<div>
											<h3 className="text-lg font-semibold">
												{announcement.title}
											</h3>
											<p className="text-sm text-gray-400">
												{new Date(
													announcement.createdAt.seconds * 1000
												).toLocaleDateString()}
											</p>
										</div>

										<button
											onClick={() => handleDelete(announcement.id)}
											className="text-sm text-red-700 font-bold hover:underline hover:cursor-pointer">
											Delete
										</button>
									</div>

									<p className="text-gray-700">{announcement.description}</p>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-500">No announcements available.</p>
					)}
				</section>
			</section>
		</>
	);
}
