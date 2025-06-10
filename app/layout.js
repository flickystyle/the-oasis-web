import Logo from './_components/Logo';
import Navigation from './_components/Navigation';
import '@/app/_styles/globals.css';

export const metadata = {
    title: {
        template: '%s / The Oasis',
        default: 'Welcome / The Oasis',
    },
    description:
        'Hotel, located in the heart of mountains, surrounded by forest',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-primary-950 text-primary-100 min-h-screen">
                <header>
                    <Logo />
                    <Navigation />
                </header>
                <main>{children}</main>
                <footer>Copyright by me</footer>
            </body>
        </html>
    );
}
