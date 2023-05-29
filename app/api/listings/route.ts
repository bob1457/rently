import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';


export async function POST (request: Request) {   

    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error() // NextResponse.redirect('/login')
    }

    const body = await request.json()
    // const { title, description, imageSrc, category, roomCount, bathRoomCount, guestCount, location, price  } = body;
    const { 
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathRoomCount,
        guestCount,
        location,
        price,
       } = body;

       console.log(body);

       Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
          NextResponse.error();
        }
      });

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathRoomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id  
        } 
    })         

    // return NextResponse.redirect(`/listings/${listing.id}`);
    return NextResponse.json(listing);
}