import Link from 'next/link';
import {
	FaFacebook,
	FaInstagram,
	FaPhoneAlt,
	FaMapMarkerAlt,
} from 'react-icons/fa';

export default function Footer() {
	return (
		<footer className="bg-[#EDF2F4] border-t border-[#2B2D42] mt-10">
			{/* Top Section */}
			<div className="max-w-5xl mx-auto py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-[#2B2D42] px-4">
				{/* Navigation Links */}
				<div>
					<h3 className="font-bold text-lg">Quick Links</h3>
					<ul className="space-y-2 mt-2">
						<li>
							<Link href="/about" className="hover:text-red-800">
								About
							</Link>
						</li>
						<li>
							<Link href="/events" className="hover:text-red-800">
								Events
							</Link>
						</li>
						<li>
							<Link href="/gallery" className="hover:text-red-800">
								Gallery
							</Link>
						</li>
						<li>
							<Link href="/contact" className="hover:text-red-800">
								Contact
							</Link>
						</li>
						<li>
							<Link href="/donate" className="hover:text-red-800">
								Donate
							</Link>
						</li>
					</ul>
				</div>

				{/* Map Placeholder */}
				<div>
					<h3 className="font-bold text-lg">Find Us</h3>
					<div className="mt-2 flex items-centre hover:text-[#EF233C] hover:cursor-pointer">
						<a
							href="https://www.google.co.in/maps/place/Ghaziabad+Kalibari+Samity/@28.692397,77.4453021,17z/data=!3m1!4b1!4m6!3m5!1s0x390cf175483c7f9b:0xba670237b775d287!8m2!3d28.6923923!4d77.447877!16s%2Fg%2F1tgxgftm?entry=ttu&g_ep=EgoyMDI1MDMxNy4wIKXMDSoASAFQAw%3D%3D"
							className=" flex items-start m-0 gap-1"
							target="_blank"
							rel="noopener noreferrer">
							<FaMapMarkerAlt className=" w-5 h-5" />
							Ghaziabad, Uttar Pradesh, India
						</a>
					</div>
				</div>

				{/* Social Media */}
				<div>
					<h3 className="font-bold text-lg">Connect with Us</h3>
					<div className="flex space-x-4 mt-2">
						<Link
							href="https://www.facebook.com/gkbs.sanjaynagar"
							className="hover:text-[#EF233C] hover:cursor-pointer "
							target="_blank">
							<FaFacebook className="w-6 h-6" />
						</Link>
						<Link
							href="#"
							className="hover:text-[#EF233C] hover:cursor-pointer"
							target="_blank">
							<FaInstagram className="w-6 h-6" />
						</Link>
						<Link
							href="#"
							className="hover:text-[#EF233C] hover:cursor-pointer"
							target="_blank">
							<FaPhoneAlt className="w-6 h-6" />
						</Link>
					</div>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="bg-red-100 text-center py-3 text-[#EF233C] text-sm px-4">
				© 2025 Ghaziabad Kali Bari Samity
			</div>
		</footer>
	);
}
