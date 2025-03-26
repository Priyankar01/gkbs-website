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
		<main className="max-w-5xl mx-auto px-4 py-10 text-gray text-center flex flex-col align-middle justify-center">
			{/* Hero Section */}
			<section className="text-center">
				<h1 className="text-4xl font-semibold text-[#EF233C]">About Us</h1>
				<p className="mt-2 text-xl mb-1">
					Preserving culture, tradition, and devotion.
				</p>
				<p className="max-w-2xl mx-auto text-justify">
					Welcome to GKBS Sanjaynagar, a community dedicated to preserving and
					celebrating our rich cultural heritage. We strive to foster unity,
					organize events, and support social causes that strengthen our bonds.
				</p>
			</section>

			{/* Mission & Vision */}
			<section className="mt-10  ">
				<h2 className="text-2xl font-semibold text-[#EF233C]">
					Our Mission & Vision
				</h2>
				<p className="mt-2 max-w-3xl mx-auto text-justify">
					At GKBS Sanjaynagar, we envision a future where rich traditions
					seamlessly blend with modern values, fostering a harmonious and
					progressive community. Our mission is to preserve and celebrate the
					essence of Bengali culture, ensuring that its timeless heritage
					continues to inspire generations. Through vibrant social, cultural,
					and charitable initiatives, we strive to create meaningful experiences
					that strengthen communal bonds and nurture a spirit of togetherness.
					With a deep commitment to education and welfare, we extend our support
					to those in need, empowering the underprivileged with opportunities
					for a brighter future. Our vision is to cultivate an inclusive and
					dynamic environment where heritage is honored, collective
					participation thrives, and progress paves the way for a better
					tomorrow.
				</p>
			</section>

			{/* History */}
			<section className="mt-10">
				<h2 className="text-2xl font-semibold text-[#EF233C]">Our History</h2>
				<p className="mt-2 max-w-3xl mx-auto text-justify">
					GKBS Sanjaynagar was established in 1990 with a profound vision—to
					bring together the Bengali community and uphold the richness of our
					cultural heritage. Since its inception, it has stood as a beacon of
					tradition, unity, and collective spirit, fostering an enduring sense
					of belonging among its members. Through the years, our organization
					has been at the heart of numerous cultural and religious celebrations,
					with Durga Puja being a centerpiece of our devotion and festivity.
					Beyond celebrations, we have remained deeply committed to social
					welfare, organizing charitable initiatives that extend support to
					those in need. Every event, every gathering, and every act of service
					reflects our unwavering dedication to preserving our heritage while
					strengthening the bonds of our community.
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
