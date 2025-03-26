export default function About() {
	const members = [
		{ name: 'John Doe', designation: 'President', image: '/john.jpg' },
		{ name: 'Jane Smith', designation: 'Vice President', image: '/jane.jpg' },
		{ name: 'Michael Lee', designation: 'Secretary', image: '/michael.jpg' },
		{ name: 'Emily Davis', designation: 'Treasurer', image: '/emily.jpg' },
		{ name: 'Daniel Brown', designation: 'Member', image: '/daniel.jpg' },
		{ name: 'Sophia Wilson', designation: 'Member', image: '/sophia.jpg' },
	];

	const ProfileCard = ({ member }) => {
		return (
			<div className="bg-white shadow-lg rounded-2xl p-4 text-center">
				{/* <Image
					src={member.image}
					alt={member.name}
					width={100}
					height={100}
					className="rounded-full mx-auto mb-2"
				/> */}
				<div className="rounded-full mx-auto mb-2"></div>
				<h3 className="text-lg font-semibold">{member.name}</h3>
				<p className="text-gray-600 text-sm">{member.designation}</p>
			</div>
		);
	};
	return (
		<main className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
			{/* Hero Section */}
			<section className="text-center">
				<h1 className="text-4xl font-semibold text-[#EF233C]">About Us</h1>
				<p className="mt-2 text-lg">
					Preserving culture, tradition, and devotion.
				</p>
			</section>

			{/* Mission & Vision */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-[#EF233C]">
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
				<h2 className="text-2xl font-semibold text-[#EF233C]">Our History</h2>
				<p className="mt-2">
					Founded with the vision of bringing the Bengali community together,
					our temple has been a center for devotion and cultural heritage. Over
					the years, we have hosted various religious events, festivals, and
					social programs.
				</p>
			</section>

			{/* Members */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-[#EF233C]">Our Committee</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{members.map((member, index) => (
						<ProfileCard key={index} member={member} />
					))}
				</div>
			</section>

			{/* Image Section */}
			{/* <section className="mt-10 flex justify-center">
				<div className="w-full md:w-3/4 bg-gray-200 h-60 flex items-center justify-center text-gray-500">
					Image Placeholder
				</div>
			</section> */}
		</main>
	);
}
