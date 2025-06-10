import Image from 'next/image';
import Link from 'next/link';
// import logo from '@/public/logo.png';
function Logo() {
    return (
        <Link href="/" className="flex items-center gap-4 z-10">
            <Image
                src="/logo.png"
                height="80"
                width="80"
                alt="The Wild Oasis logo"
                priority
                className="scale-x-95"
            />

            <span className="text-xl font-semibold text-primary-100">
                The Oasis
            </span>
        </Link>
    );
}

export default Logo;
