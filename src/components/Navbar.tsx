'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/file.svg';

import Link from 'next/link';

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="bg-white shadow-md py-4 px-10 flex justify-between items-center">
			<Link href="/" className="flex items-center">
				<div>
					<Logo className="w-12" />
				</div>
				<h1 className="text-xl font-bold ps-2">GKBS</h1>
			</Link>

			{/* Desktop Menu */}
			<div className="hidden md:flex space-x-6 items-center">
				<Link href="/about" className="hover:text-red-500 font-medium">
					About
				</Link>
				<Link href="/event" className="hover:text-red-500 font-medium">
					Events
				</Link>
				<Link href="/gallery" className="hover:text-red-500 font-medium">
					Gallery
				</Link>
				<Link href="/contact" className="hover:text-red-500 font-medium">
					Contact
				</Link>
				<Link
					href="/donate"
					className="bg-red-500 border-1 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black  transition duration-200">
					Donate
				</Link>
			</div>

			{/* Mobile Menu Button */}
			<button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
				{menuOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
					<Link href="/about" className="hover:text-gray-500">
						About
					</Link>
					<Link href="/events" className="hover:text-gray-500">
						Events
					</Link>
					<Link href="/gallery" className="hover:text-gray-500">
						Gallery
					</Link>
					<Link href="/contact" className="hover:text-gray-500">
						Contact
					</Link>
					<Link
						href="/donate"
						className="bg-red-500 border-1 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black  transition duration-200">
						Donate
					</Link>
				</div>
			)}
		</nav>
	);
}
