'use client';
import { useState } from 'react';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import TestFirestore from "@/components/TestFirestore";


export default function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateEmail = (email: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		if (!formData.name || !formData.email || !formData.message) {
			setError('All fields are required.');
			return;
		}

		if (!validateEmail(formData.email)) {
			setError('Please enter a valid email address.');
			return;
		}

		setSuccess('Message Sent Successfully!');
		setFormData({ name: '', email: '', message: '' });
	};

	return (
		<main className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
			{/* Hero Section */}
			<section className="text-center">
				<h1 className="text-4xl font-bold text-red-500">Contact Us</h1>
				<p className="mt-2 text-lg">We&apos;d love to hear from you!</p>
			</section>

			{/* Contact Info */}
			<section className="mt-10 text-center space-y-2 flex flex-col">
				<a
					href="https://www.google.co.in/maps/place/Ghaziabad+Kalibari+Samity/@28.692397,77.4453021,17z/data=!3m1!4b1!4m6!3m5!1s0x390cf175483c7f9b:0xba670237b775d287!8m2!3d28.6923923!4d77.447877!16s%2Fg%2F1tgxgftm?entry=ttu&g_ep=EgoyMDI1MDMxNy4wIKXMDSoASAFQAw%3D%3D"
					target="_blank"
					className="flex justify-center items-center gap-2 text-blue-600 hover:text-red-500">
					<FaMapMarkerAlt /> Ghaziabad, Uttar Pradesh, India
				</a>
				<a
					href="tel:+91XXXXXXXXXX"
					className="flex justify-center items-center gap-2 text-blue-600 hover:text-red-500">
					<FaPhoneAlt />
					+91 XXXXXXXXXX
				</a>
			</section>

			{/* Contact Form */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-red-500 text-center ">
					Send Us a Message
				</h2>
				<form
					onSubmit={handleSubmit}
					className="mt-4 max-w-lg mx-auto space-y-4">
					{error && <p className="text-red-600 text-center">{error}</p>}
					{success && <p className="text-green-600 text-center">{success}</p>}
					<input
						type="text"
						name="name"
						placeholder="Your Name"
						value={formData.name}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-red-300"
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Your Email"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-red-300"
						required
					/>
					<textarea
						name="message"
						placeholder="Your Message"
						value={formData.message}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-red-300"
						rows={4}
						required></textarea>
					<button
						type="submit"
						className="w-full bg-red-500 text-white py-2 rounded hover:bg-[#2b2d42] hover:cursor-pointer transition duration-100">
						Send Message
					</button>
				</form>
				<p className="text-center text-gray-700 mt-4">
					Or you can contact us on{' '}
					<a
						href="https://wa.me/91XXXXXXXXXX"
						target="_blank"
						className="text-green-600 font-semibold">
						WhatsApp
					</a>
					.
				</p>
			</section>


			<h1 className="text-3xl font-bold text-center">GKBS Website</h1>
      <TestFirestore />
		</main>
	);
}
