'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';

import { supabase } from './supabase';
import { getBookings } from './data-service';
import { redirect } from 'next/navigation';

export async function updateGuestAction(formData) {
    const session = await auth();
    if (!session) throw new Error('You must be logged in');

    const nationalID = formData.get('nationalID');
    const [nationality, countryFlag] = formData.get('nationality').split('%');

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
        throw new Error('Please provide a valid national ID');
    }
    const updateData = { nationality, countryFlag, nationalID };

    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId);

    if (error) {
        throw new Error('Guest could not be updated');
    }

    revalidatePath('/account/profile');
}

export async function signInAction() {
    await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
}

//bookings in supabase
export async function deleteReservation(bookingId) {
    const session = await auth();
    if (!session) throw new Error('You must be logged in');

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingsIds = guestBookings.map((booking) => booking.id);

    //delete protection
    if (!guestBookingsIds.includes(bookingId)) {
        throw new Error('You are not allowed delete this booking');
    }

    const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }

    revalidatePath('/account/reservations');
}
//bookings in supabase
export async function updateReservation(formData) {
    const bookingId = Number(formData.get('bookingId'));
    const session = await auth();
    if (!session) throw new Error('You must be logged in');
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingsIds = guestBookings.map((booking) => booking.id);
    console.log(guestBookingsIds);
    if (!guestBookingsIds.includes(bookingId)) {
        throw new Error('You are not allowed update this booking');
    }

    const updatedFields = {
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000),
    };

    const { error } = await supabase
        .from('bookings')
        .update(updatedFields)
        .eq('id', bookingId)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }
    // revalidatePath(`/account/reservations/{bookingId}`);
    redirect('/account/reservations');
}

//bookings in supabase
export async function createReservation(bookingData, formData) {
    const session = await auth();
    if (!session) throw new Error('You must be logged in');

    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        status: 'unconfirmed',
        isPaid: false,
        hasBreakfast: false,
    };

    const { error } = await supabase.from('bookings').insert([newBooking]);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be created');
    }

    // revalidatePath(`/cabins/${bookingData.cabinId}`);
    redirect('/cabins/thankyou');
}
