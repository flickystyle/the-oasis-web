import Image from 'next/image';
import { signInAction } from '../_lib/actions';

function SignInButton() {
    return (
        <form action={signInAction}>
            <button
                className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium rounded-2xl transition-colors
            hover:bg-accent-500 hover:text-primary-950 duration-200"
            >
                <Image
                    src="https://authjs.dev/img/providers/google.svg"
                    alt="Google logo"
                    height="24"
                    width="24"
                    className="-translate-y-0.5"
                />
                <span>Continue with Google</span>
            </button>
        </form>
    );
}

export default SignInButton;
