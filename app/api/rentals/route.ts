import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { RentalSchema } from "@/lib/schemas/rental";

export async function POST(request: Request) {
  const user = verifyToken(request);

  if (!user) {
    return NextResponse.json(
      { success: false, message: "กรุณา Login ก่อนใช้งาน" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const result = RentalSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { success: false, errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  let totalAmount = 0;

  const rentalItems: {
    equipmentId: number;
    quantity: number;
    days: number;
    priceDay: number;
  }[] = [];

  for (const item of result.data.items) {
    const equipment = await prisma.equipment.findUnique({
      where: { id: item.equipmentId },
    });

    if (!equipment) {
      return NextResponse.json(
        {
          success: false,
          message: `ไม่พบอุปกรณ์ ID ${item.equipmentId}`,
        },
        { status: 404 }
      );
    }

    if (equipment.stock < item.quantity) {
      return NextResponse.json(
        {
          success: false,
          message: `${equipment.name} มีจำนวนไม่เพียงพอ`,
        },
        { status: 400 }
      );
    }

    const subtotal =
      equipment.priceDay * item.quantity * item.days;

    totalAmount += subtotal;

    rentalItems.push({
      equipmentId: equipment.id,
      quantity: item.quantity,
      days: item.days,
      priceDay: equipment.priceDay,
    });
  }

  const rentalNo = `RT-${Date.now()}`;

  const rental = await prisma.$transaction(async (tx) => {
    const newRental = await tx.rental.create({
      data: {
        rentalNo,
        userId: user.id,
        totalAmount,
        items: { create: rentalItems },
      },
      include: {
        items: { include: { equipment: true } },
      },
    });

    for (const item of rentalItems) {
      await tx.equipment.update({
        where: { id: item.equipmentId },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

    return newRental;
  });

  return NextResponse.json(
    {
      success: true,
      message: "เช่าอุปกรณ์สำเร็จ",
      data: rental,
    },
    { status: 201 }
  );
}

export async function GET(request: Request) {
  const user = verifyToken(request);

  if (!user) {
    return NextResponse.json(
      { success: false, message: "กรุณา Login ก่อนใช้งาน" },
      { status: 401 }
    );
  }

  let where = {};

  if (user.role === "CUSTOMER") {
    where = { userId: user.id };
  }

  const rentals = await prisma.rental.findMany({
    where,
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      items: {
        include: { equipment: true },
      },
    },
    orderBy: { id: "desc" },
  });

  return NextResponse.json({
    success: true,
    data: rentals,
  });
}