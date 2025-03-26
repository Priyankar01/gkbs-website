'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

export default function TestFirestore() {
	interface FirestoreData {
		id: string;
		name: string;
		description: string;
		date: { seconds: number }; // Firestore Timestamp
	}

	const [data, setData] = useState<FirestoreData[]>([]);
	const [loading, setLoading] = useState(false);

	// Function to add test data
	const addTestData = async () => {
		setLoading(true);
		try {
			await addDoc(collection(db, 'testCollection'), {
				name: 'Test Event',
				description: 'This is a test Firestore event',
				date: Timestamp.fromDate(new Date()), // Store as Firestore Timestamp
			});
			alert('Test data added!');
			fetchData(); // Fetch new data after adding
		} catch (error) {
			console.error('Error adding document:', error);
		}
		setLoading(false);
	};

	// Function to fetch test data
	const fetchData = async () => {
		const querySnapshot = await getDocs(collection(db, 'testCollection'));

		const data: FirestoreData[] = querySnapshot.docs.map((doc) => {
			const docData = doc.data();
			return {
				id: doc.id, // Firestore's document ID
				name: docData.name || 'Unknown Name', // Ensure it exists
				description: docData.description || 'No Description',
				date: docData.date || { seconds: 0 }, // Default Firestore Timestamp
			};
		});

		setData(data);
	};

	// Fetch data on component mount
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="p-6 border rounded-lg shadow-lg text-center">
			<h2 className="text-xl font-bold">Firestore Test</h2>
			<button
				onClick={addTestData}
				className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
				disabled={loading}>
				{loading ? 'Adding...' : 'Add Test Data'}
			</button>
			<div className="mt-4">
				<h3 className="text-lg font-semibold">Fetched Data:</h3>
				<ul>
					{data.map((item) => (
						<li key={item.id} className="border p-2 mt-2 rounded">
							{item.name} - {item.description}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
