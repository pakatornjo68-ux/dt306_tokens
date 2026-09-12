import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EquipmentSchema } from "@/lib/schemas/equipment";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const limit = Math.min(
    Math.max(Number(searchParams.get("limit")) || 5, 1),
    50
  );
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  const where = {
    name: { contains: search },
  };

  const [equipment, total] = await Promise.all([
    prisma.equipment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: "desc" },
    }),
    prisma.equipment.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: equipment,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: Request) {
  const user = verifyToken(request);

  if (!user) {
    return NextResponse.json(
      { success: false, message: "กรุณา Login ก่อนใช้งาน" },
      { status: 401 }
    );
  }

  if (user.role !== "ADMIN" && user.role !== "STAFF") {
    return NextResponse.json(
      { success: false, message: "ไม่มีสิทธิ์ใช้งาน" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const result = EquipmentSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { success: false, errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const equipment = await prisma.equipment.create({
    data: result.data,
  });

  return NextResponse.json(
    { success: true, message: "เพิ่มอุปกรณ์สำเร็จ", data: equipment },
    { status: 201 }
  );
}