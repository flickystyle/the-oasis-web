import Image from 'next/image';
import Link from 'next/link';
import bg from '@/public/bg.png';

export default function Page() {
    return (
        <main className="mt-24">
            <Image
                src={bg}
                fill
                placeholder="blur"
                quality={80}
                className="object-cover object-bottom opacity-50"
                alt="Mountains and forests with cabins"
            />

            <div className="relative z-10 text-center">
                <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
                    Welcome traveler.
                </h1>
                <Link
                    href="/cabins"
                    className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all rounded-2xl"
                >
                    Explore cabins
                </Link>
            </div>
        </main>
    );
}
