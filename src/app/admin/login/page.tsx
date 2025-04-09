// src/app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			router.push('/admin');
		} catch (err) {
			console.log(err);
			setError('Failed to login. Please check your credentials.');
		}
	};

	return (
		<div className="">
			{error && <p>{error}</p>}
			<form
				className="max-w-sm mx-auto bg-red-100 p-2 rounded-xl mt-3"
				onSubmit={handleLogin}>
				<div className="mb-5">
					<label className="block mb-2 text-sm font-medium text-gray-900 ">
						Your email
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
						placeholder="abc@xyz.com"
						required
					/>
				</div>
				<div className="mb-5">
					<label className="block mb-2 text-sm font-medium text-gray-900">
						Your password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
						required
					/>
				</div>
				<button
					type="submit"
					className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:cursor-pointer">
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
