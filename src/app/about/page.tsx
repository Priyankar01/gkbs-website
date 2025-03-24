export default function About() {
	return (
		<main className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
			{/* Hero Section */}
			<section className="text-center">
				<h1 className="text-4xl font-bold text-red-700">About Us</h1>
				<p className="mt-2 text-lg">
					Preserving culture, tradition, and devotion.
				</p>
			</section>

			{/* Mission & Vision */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-red-700">
					Our Mission & Vision
				</h2>
				<p className="mt-2">
					Ghaziabad Kali Bari Samity is dedicated to promoting spiritual,
					cultural, and community services. We aim to provide a place of
					worship, celebrate festivals, and preserve Bengali traditions.
				</p>
			</section>

			{/* History */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-red-700">Our History</h2>
				<p className="mt-2">
					Founded with the vision of bringing the Bengali community together,
					our temple has been a center for devotion and cultural heritage. Over
					the years, we have hosted various religious events, festivals, and
					social programs.
				</p>
			</section>

			{/* Image Section */}
			<section className="mt-10 flex justify-center">
				<div className="w-full md:w-3/4 bg-gray-200 h-60 flex items-center justify-center text-gray-500">
					Image Placeholder
				</div>
			</section>
		</main>
	);
}
