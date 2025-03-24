'use client';
import { useState } from 'react';
import { FaImage, FaPlus, FaBullhorn, FaLink } from 'react-icons/fa';
import * as Tabs from '@radix-ui/react-tabs';

export default function AdminPanel() {
	const [imageSource, setImageSource] = useState('url');
	const [galleryImageSource, setGalleryImageSource] = useState('url');

	return (
		<main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 bg-white shadow-lg rounded-lg">
			<h1 className="text-4xl font-bold text-red-700 text-center mb-8">
				Admin Panel
			</h1>

			<Tabs.Root defaultValue="events" className="w-full">
				<Tabs.List className="flex justify-center mb-8 space-x-6 border-b-2 pb-3">
					{[
						{ label: 'Manage Events', value: 'events' },
						{ label: 'Manage Gallery', value: 'gallery' },
						{ label: 'Manage Announcements', value: 'announcements' },
					].map(({ label, value }) => (
						<Tabs.Trigger
							key={value}
							value={value}
							className="px-6 py-2 text-lg font-semibold rounded-t-md transition-all duration-300 data-[state=active]:text-red-600 data-[state=active]:border-b-4 data-[state=active]:border-red-600 hover:text-red-500">
							{label}
						</Tabs.Trigger>
					))}
				</Tabs.List>

				<div className="p-6 bg-gray-50 rounded-b-lg">
					<Tabs.Content value="events">
						<h2 className="text-2xl font-semibold text-red-700 mb-4">
							Add New Event
						</h2>
						<div className="space-y-4">
							<input
								required
								type="text"
								placeholder="Event Title"
								className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
							/>
							<input
								required
								type="date"
								className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
							/>
							<textarea
								required
								placeholder="Event Description"
								className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"></textarea>
							<div className="flex space-x-4">
								<button
									onClick={() => setImageSource('url')}
									className={`px-4 py-2 text-sm font-semibold rounded ${
										imageSource === 'url'
											? 'bg-red-600 text-white'
											: 'bg-gray-300'
									}`}>
									Use URL
								</button>
								<button
									onClick={() => setImageSource('upload')}
									className={`px-4 py-2 text-sm font-semibold rounded ${
										imageSource === 'upload'
											? 'bg-red-600 text-white'
											: 'bg-gray-300'
									}`}>
									Upload Image
								</button>
							</div>
							{imageSource === 'url' ? (
								<input
									required
									type="text"
									placeholder="Image URL"
									className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
								/>
							) : (
								<input
									required
									type="file"
									className="w-full p-3 border border-gray-300 bg-gray-200 rounded focus:ring-2 focus:ring-red-500"
								/>
							)}
							<button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 flex justify-center items-center gap-2 transition duration-300">
								<FaPlus /> Add Event
							</button>
						</div>
					</Tabs.Content>

					<Tabs.Content value="gallery">
						<h2 className="text-2xl font-semibold text-red-700 mb-4">
							Add Image to Gallery
						</h2>
						<div className="space-y-4">
							<div className="flex space-x-4">
								<button
									onClick={() => setGalleryImageSource('url')}
									className={`px-4 py-2 text-sm font-semibold rounded ${
										galleryImageSource === 'url'
											? 'bg-red-600 text-white'
											: 'bg-gray-300'
									}`}>
									Use URL
								</button>
								<button
									onClick={() => setGalleryImageSource('upload')}
									className={`px-4 py-2 text-sm font-semibold rounded ${
										galleryImageSource === 'upload'
											? 'bg-red-600 text-white'
											: 'bg-gray-300'
									}`}>
									Upload Image
								</button>
							</div>
							{galleryImageSource === 'url' ? (
								<input
									required
									type="text"
									placeholder="Image URL"
									className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
								/>
							) : (
								<input
									required
									type="file"
									className="w-full p-3 border border-gray-300 bg-gray-200 rounded focus:ring-2 focus:ring-red-500"
								/>
							)}
							<button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 flex justify-center items-center gap-2 transition duration-300">
								<FaImage /> Add Image
							</button>
						</div>
					</Tabs.Content>

					<Tabs.Content value="announcements">
						<h2 className="text-2xl font-semibold text-red-700 mb-4">
							Add New Announcement
						</h2>
						<div className="space-y-4">
							<input
								required
								type="text"
								placeholder="Announcement Title"
								className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
							/>
							<textarea
								required
								placeholder="Announcement Details"
								className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"></textarea>
							<button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 flex justify-center items-center gap-2 transition duration-300">
								<FaBullhorn /> Add Announcement
							</button>
						</div>
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</main>
	);
}
