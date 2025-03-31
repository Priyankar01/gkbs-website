'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig';
import { User } from 'firebase/auth'; // Import User type from Firebase auth

const AdminPage = () => {
	const [user, setUser] = useState<User | null>(null);
	const [activeTab, setActiveTab] = useState('events');
	const router = useRouter();

	// Function to handle user logout
	const handleLogout = async () => {
		await signOut(auth);
		router.push('/admin/login');
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (!user) {
				router.push('/admin/login');
			} else {
				setUser(user);
			}
		});

		return () => unsubscribe();
	}, [router]);

	return (
		<div>
			{user ? (
				<>
					<h2>Welcome, {user.displayName || user.email}</h2>
					<button
						className="bg-[#EF233C] border-1 text-white font-bold px-4 py-2 rounded-lg hover:bg-white hover:text-[#2B2D42] hover:cursor-pointer transition duration-200"
						onClick={handleLogout}>
						Logout
					</button>

					<div>
						<button onClick={() => setActiveTab('events')}>Events</button>
						<button onClick={() => setActiveTab('announcements')}>
							Announcements
						</button>
						<button onClick={() => setActiveTab('gallery')}>Gallery</button>
					</div>

					<div>
						{activeTab === 'events' && <h3>Events Content</h3>}
						{activeTab === 'announcements' && <h3>Announcements Content</h3>}
						{activeTab === 'gallery' && <h3>Gallery Content</h3>}
					</div>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default AdminPage;
