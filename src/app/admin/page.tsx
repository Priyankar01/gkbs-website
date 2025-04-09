'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig';
import { User } from 'firebase/auth'; // Import User type from Firebase auth
import EventComponent from '../../components/Event'; // Adjust path if necessary
import GalleryComponent from '../../components/Gallery';

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
				<section className='max-w mx-auto'>
					<h2 className="flex justify-center items-center max-w-sm mx-auto gap-4  m-2">
						Welcome, {user.displayName || user.email}
						<button
							className="bg-[#EF233C] border-1 text-white font-bold px-4 py-2 rounded-lg hover:bg-white hover:text-[#2B2D42] hover:cursor-pointer transition duration-200"
							onClick={handleLogout}>
							Logout
						</button>
					</h2>

					<div className="flex gap-2 justify-center items-center">
						<button
							className="bg-[#EF233C] border-1 text-white font-bold px-4 py-2 rounded-lg hover:bg-white hover:text-[#2B2D42]  transition duration-200 hover:cursor-pointer"
							onClick={() => setActiveTab('events')}>
							Events
						</button>
						<button
							className="bg-[#EF233C] border-1 text-white font-bold px-4 py-2 rounded-lg hover:bg-white hover:text-[#2B2D42]  transition duration-200 hover:cursor-pointer"
							onClick={() => setActiveTab('announcements')}>
							Announcements
						</button>
						<button
							className="bg-[#EF233C] border-1 text-white font-bold px-4 py-2 rounded-lg hover:bg-white hover:text-[#2B2D42]  transition duration-200 hover:cursor-pointer"
							onClick={() => setActiveTab('gallery')}>
							Gallery
						</button>
					</div>

					<div>
						{activeTab === 'events' && <EventComponent />}
						{activeTab === 'announcements' && <h3>Announcements Content</h3>}
						{activeTab === 'gallery' && <GalleryComponent />}
					</div>
				</section>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default AdminPage;
