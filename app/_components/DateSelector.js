'use client';

import {
    differenceInDays,
    isPast,
    isSameDay,
    isWithinInterval,
} from 'date-fns';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useReservation } from './ReservationContext';

function isAlreadyBooked(range, datesArr) {
    return (
        range.from &&
        range.to &&
        datesArr.some((date) =>
            isWithinInterval(date, { start: range.from, end: range.to })
        )
    );
}

function DateSelector({ settings, cabin, bookedDates }) {
    const { range, setRange, resetRange } = useReservation();
    const displayRange = isAlreadyBooked(range, bookedDates) ? null : range;
    const { regularPrice, discount } = cabin;
    const { minBookingLength, maxBookingLength } = settings;
    const numNights = differenceInDays(displayRange.to, displayRange.from);
    const cabinPrice = numNights * (regularPrice - discount);
    const startMonth = new Date();
    const endMonth = new Date();

    return (
        <div className="flex flex-col">
            <DayPicker
                className="pt-12 place-self-center-safe -translate-y-6"
                mode="range"
                selected={displayRange}
                onSelect={setRange}
                min={minBookingLength + 1}
                max={maxBookingLength}
                startMonth={startMonth}
                endMonth={
                    new Date(
                        startMonth.getFullYear() + 1,
                        startMonth.getMonth() + 1
                    )
                }
                captionLayout="dropdown"
                numberOfMonths={1}
                disabled={(curDate) =>
                    isPast(curDate) ||
                    bookedDates.some((date) => isSameDay(date, curDate))
                }
            />

            <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px] rounded-bl-2xl">
                <div className="flex items-baseline gap-6">
                    <p className="flex gap-2 items-baseline">
                        {discount > 0 ? (
                            <>
                                <span className="text-2xl">
                                    ${regularPrice - discount}
                                </span>
                                <span className="line-through font-semibold text-primary-700">
                                    ${regularPrice}
                                </span>
                            </>
                        ) : (
                            <span className="text-2xl">${regularPrice}</span>
                        )}
                        <span className="">/night</span>
                    </p>
                    {numNights ? (
                        <>
                            <p className="bg-accent-600 px-3 py-2 text-2xl rounded-2xl">
                                <span>&times;</span> <span>{numNights}</span>
                            </p>
                            <p>
                                <span className="text-lg font-bold uppercase">
                                    Total
                                </span>{' '}
                                <span className="text-2xl font-semibold">
                                    ${cabinPrice}
                                </span>
                            </p>
                        </>
                    ) : null}
                </div>

                {displayRange.from || displayRange.to ? (
                    <button
                        className="border border-primary-800 py-2 px-4 text-sm font-semibold rounded-2xl hover:bg-accent-400 transition-all duration-200"
                        onClick={resetRange}
                    >
                        Clear
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default DateSelector;
