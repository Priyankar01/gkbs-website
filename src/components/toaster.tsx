'use client';
import * as Toast from '@radix-ui/react-toast';
import { useState } from 'react';

export default function ToastComponent() {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [type, setType] = useState('success');

	const showToast = (msg, variant = 'success') => {
		setMessage(msg);
		setType(variant);
		setOpen(true);
	};

	return (
		<Toast.Provider>
			<Toast.Root
				open={open}
				onOpenChange={setOpen}
				className={`fixed bottom-5 right-5 px-4 py-2 rounded-md text-white text-sm shadow-lg transition-all duration-300 ${
					type === 'error' ? 'bg-red-600' : 'bg-green-600'
				}`}>
				{message}
			</Toast.Root>
			<Toast.Viewport className="fixed bottom-0 right-0 p-4 flex flex-col space-y-2 w-80 max-w-full" />
		</Toast.Provider>
	);
}
