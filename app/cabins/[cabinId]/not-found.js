import Link from 'next/link';

function NotFound() {
    return (
        <main className="text-center space-y-6 mt-20">
            <h1 className="text-3xl font-semibold">
                404 This cabin could not be found :(
            </h1>
            <Link
                href="/cabins"
                className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg rounded-2xl"
            >
                Back to all cabins
            </Link>
        </main>
    );
}

export default NotFound;
