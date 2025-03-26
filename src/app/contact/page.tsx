'use client';
import { useState } from 'react';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert('Message Sent!'); // Replace with actual functionality later
	};

	return (
		<main className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
			{/* Hero Section */}
			<section className="text-center">
				<h1 className="text-4xl font-bold text-red-700">Contact Us</h1>
				<p className="mt-2 text-lg">We&apos;d love to hear from you!</p>
			</section>

			{/* Contact Info */}
			<section className="mt-10 text-center">
				<p className="flex justify-center items-center gap-1">
					<FaMapMarkerAlt />
					Ghaziabad, Uttar Pradesh, India
				</p>
				<p className="flex justify-center items-center gap-1">
					<FaPhoneAlt />
					Phone: +91 XXXXXXXXXX
				</p>
			</section>

			{/* Contact Form */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-red-700 text-center ">
					Send Us a Message
				</h2>
				<form
					onSubmit={handleSubmit}
					className="mt-4 max-w-lg mx-auto space-y-4">
					<input
						type="text"
						name="name"
						placeholder="Your Name"
						value={formData.name}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Your Email"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
					<textarea
						name="message"
						placeholder="Your Message"
						value={formData.message}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded"
						rows={4}
						required></textarea>
					<button
						type="submit"
						className="w-full bg-red-500 text-white py-2 rounded hover:bg-white hover:text-black border-1 hover:cursor-pointer">
						Send Message
					</button>
				</form>
			</section>
		</main>
	);
}
