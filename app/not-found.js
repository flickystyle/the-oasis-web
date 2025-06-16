import Link from 'next/link';

function NotFound() {
    return (
        <main className="text-center space-y-6 mt-20">
            <h1 className="text-3xl font-semibold">
                404 This page could not be found :(
            </h1>
            <Link
                href="/"
                className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg rounded-2xl"
            >
                Go back home
            </Link>
        </main>
    );
}

export default NotFound;
