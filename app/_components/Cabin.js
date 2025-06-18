import Image from 'next/image';
import TextExpander from './TextExpander';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';

function Cabin({ cabin }) {
    const {
        id,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
    } = cabin;
    
    return (
        <div className="grid grid-cols-[3fr_4fr] gap-20 border rounded-2xl border-primary-800 py-3 px-10 mb-24">
            <div className="relative scale-[1.17] -translate-x-3">
                <Image
                    fill
                    src={image}
                    alt={`Cabin ${name}`}
                    sizes="100vh"
                    priority
                    className="object-cover rounded-2xl"
                />
            </div>

            <div>
                <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-4 pb-1 w-[150%] rounded-2xl">
                    Cabin {name}
                </h3>

                <p className="text-lg text-primary-300 mb-10">
                    <TextExpander>{description}</TextExpander>
                </p>

                <ul className="flex flex-col gap-4 mb-7">
                    <li className="flex gap-3 items-center">
                        <UsersIcon className="h-5 w-5 text-primary-600" />
                        <span className="text-lg">
                            For up to{' '}
                            <span className="font-bold">{maxCapacity}</span>{' '}
                            guests
                        </span>
                    </li>
                    <li className="flex gap-3 items-center">
                        <MapPinIcon className="h-5 w-5 text-primary-600" />
                        <span className="text-lg">
                            Located in the heart of the{' '}
                            <span className="font-bold">mountains</span>{' '}
                        </span>
                    </li>
                    <li className="flex gap-3 items-center">
                        <EyeSlashIcon className="h-5 w-5 text-primary-600" />
                        <span className="text-lg">
                            Privacy <span className="font-bold">100%</span>{' '}
                            guaranteed
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Cabin;
