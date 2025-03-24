export default function Gallery() {
	return (
		<main className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
			{/* Hero Section */}
			<section className="text-center">
				<h1 className="text-4xl font-bold text-red-700">Gallery</h1>
				<p className="mt-2 text-lg">
					A glimpse of our past events and celebrations.
				</p>
			</section>

			{/* Image Grid */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-red-700">Photo Gallery</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
					<div className="bg-gray-300 h-40 flex items-center justify-center text-gray-600">
						Image 1
					</div>
					<div className="bg-gray-300 h-40 flex items-center justify-center text-gray-600">
						Image 2
					</div>
					<div className="bg-gray-300 h-40 flex items-center justify-center text-gray-600">
						Image 3
					</div>
					<div className="bg-gray-300 h-40 flex items-center justify-center text-gray-600">
						Image 4
					</div>
					<div className="bg-gray-300 h-40 flex items-center justify-center text-gray-600">
						Image 5
					</div>
					<div className="bg-gray-300 h-40 flex items-center justify-center text-gray-600">
						Image 6
					</div>
				</div>
			</section>
		</main>
	);
}
