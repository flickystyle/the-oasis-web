'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const activeFilter = searchParams.get('capacity') ?? 'all';

    const handleFilter = (filter) => {
        const params = new URLSearchParams(searchParams);
        params.set('capacity', filter);
        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };
    return (
        <div className="border border-primary-800 flex rounded-2xl">
            <button
                className={`px-5 py-2  hover:bg-primary-700 hover:rounded-l-2xl ${
                    activeFilter === 'all' ? 'bg-primary-700 rounded-l-2xl' : ''
                }`}
                onClick={() => handleFilter('all')}
            >
                All cabins
            </button>
            <button
                className={`px-5 py-2  hover:bg-primary-700  ${
                    activeFilter === 'small' ? 'bg-primary-700' : ''
                }`}
                onClick={() => handleFilter('small')}
            >
                1&mdash;3 guests
            </button>
            <button
                className={`px-5 py-2  hover:bg-primary-700  ${
                    activeFilter === 'medium' ? 'bg-primary-700' : ''
                }`}
                onClick={() => handleFilter('medium')}
            >
                4&mdash;7 guests
            </button>
            <button
                className={`px-5 py-2  hover:bg-primary-700 hover:rounded-r-2xl ${
                    activeFilter === 'large'
                        ? 'bg-primary-700 rounded-r-2xl'
                        : ''
                }`}
                onClick={() => handleFilter('large')}
            >
                8 or more guests
            </button>
        </div>
    );
}

export default Filter;
