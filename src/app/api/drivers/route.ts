import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    const drivers = await prisma.driver.findMany({
      skip,
      take: limit,
    });

    const totalDrivers = await prisma.driver.count();

    return NextResponse.json({
      data: drivers,
      total: totalDrivers
    });
  } catch (error) {
    console.error("Error obteniendo chóferes:", error);
    return NextResponse.json({ error: "Error obteniendo chóferes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newDriver = await prisma.driver.create({
      data: {
        id: body.id,
        name: body.name,
        license: body.license,
        startShift: body.startShift,
        endShift: body.endShift,
      },
    });
    console.log("asdosakopdpok")
    return NextResponse.json(newDriver, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al crear chofer" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, license, startShift, endShift } = await req.json();
    const updatedDriver = await prisma.driver.update({
      where: { id },
      data: { name, license, startShift, endShift },
    });
    return NextResponse.json(updatedDriver);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al actualizar chofer" }, { status: 500 });
  }
}
