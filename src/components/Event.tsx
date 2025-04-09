import { useState } from 'react';
// import { db } from '@/utils/firebaseConfig';
// import { collection, addDoc } from 'firebase/firestore';

const EventComponent = () => {
	const [newEvent, setNewEvent] = useState({
		title: '',
		date: '',
		image: null,
		description: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setNewEvent((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		setNewEvent((prev) => ({
			...prev,
			image: file,
		}));
	};

	return (
		<div>
			<h3>Add New Event</h3>
			<form>
				<input
					type="text"
					name="title"
					placeholder="Event Title"
					value={newEvent.title}
					onChange={handleChange}
				/>
				<input
					type="datetime-local"
					name="date"
					value={newEvent.date}
					onChange={handleChange}
				/>

				<textarea
					name="description"
					placeholder="Event Description"
					value={newEvent.description}
					onChange={handleChange}
				/>
				<button type="submit">Add Event</button>
			</form>
		</div>
	);
};

export default EventComponent;
