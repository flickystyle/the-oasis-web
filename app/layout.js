import Logo from './components/Logo';
import Navigation from './components/Navigation';

export const metadata = {
    title: 'The Oasis',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
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
