'use client';

import Link from 'next/link';

export default function Error({ error, reset }) {
    return (
        <main className="flex justify-center items-center flex-col gap-6 mt-20">
            <h1 className="text-3xl font-semibold">Something went wrong!</h1>
            <p className="text-lg">{error.message}</p>

            <Link
                className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg rounded-2xl"
                href="/"
            >
                Try again
            </Link>
        </main>
    );
}
