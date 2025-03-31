'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			await signInWithEmailAndPassword(auth, email, password);
			router.push('/admin'); // Redirect to dashboard on success
		} catch (err) {
			setError('Invalid email or password. Please try again.');
			console.error('Login Error:', err);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-96">
				<h2 className="text-2xl font-bold mb-4 text-center text-red-600">
					Admin Login
				</h2>

				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

				<form onSubmit={handleLogin} className="space-y-4">
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
					<button
						type="submit"
						className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 hover:cursor-pointer">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
