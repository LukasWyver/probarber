"use server";

import { db } from "@/_lib/prisma";
import { revalidatePath } from "next/cache";

export async function cancelBooking(bookingId: string){
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });

  revalidatePath("/");
  revalidatePath("/bookings");
};