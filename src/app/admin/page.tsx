'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Announcements from '../../components/Announcements';
import Events from '../../components/Events';
import Gallery from '../../components/Gallery';

export default function AdminDashboard() {
	
	const [user, setUser] = useState(null);
	const [activeTab, setActiveTab] = useState('announcements');
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) {
				router.push('/admin/login'); // Redirect if not logged in
			} else {
				setUser(currentUser);
			}
		});

		return () => unsubscribe();
	}, [router]);

	const handleLogout = async () => {
		await signOut(auth);
		router.push('/admin/login');
	};

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1>
			<p className="mt-2">Welcome, {user?.email}</p>
			<button
				onClick={handleLogout}
				className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:cursor-pointer">
				Logout
			</button>

			{/* Tabs for switching sections */}
			<div className="flex space-x-4 mt-6">
				<button
					className={`py-2 px-4 rounded ${
						activeTab === 'announcements'
							? 'bg-blue-600 text-white'
							: 'bg-gray-300 hover:cursor-pointer'
					}`}
					onClick={() => setActiveTab('announcements')}>
					Announcements
				</button>
				<button
					className={`py-2 px-4 rounded ${
						activeTab === 'events'
							? 'bg-blue-600 text-white'
							: 'bg-gray-300 hover:cursor-pointer'
					}`}
					onClick={() => setActiveTab('events')}>
					Events
				</button>
				<button
					className={`py-2 px-4 rounded ${
						activeTab === 'gallery'
							? 'bg-blue-600 text-white'
							: 'bg-gray-300 hover:cursor-pointer'
					}`}
					onClick={() => setActiveTab('gallery')}>
					Gallery
				</button>
			</div>

			{/* Show the selected section */}
			<div className="mt-6">
				{activeTab === 'announcements' && <Announcements />}
				{activeTab === 'events' && <Events />}
				{activeTab === 'gallery' && <Gallery />}
			</div>
		</div>
	);
}
