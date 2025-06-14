import getCurrentUser from "@app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    location,
    actualLocation,
    price,
    amenities,
    addons,
    otherDetails,
    verifications,
    terms
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listen = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      locationValue: location.value,
      actualLocation,
      price: parseInt(price, 10),
      userId: currentUser.id,
      amenities,
      addons,
      otherDetails,
      verifications,
      terms
    },
  });

  return NextResponse.json(listen);
}
