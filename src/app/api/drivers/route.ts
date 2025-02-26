import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// Obtener todos los choferes
export async function GET() {
  try {
    const drivers = await prisma.driver.findMany();
    return NextResponse.json(drivers);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error obteniendo choferes" }, { status: 500 });
  }
}

// Agregar un nuevo chofer
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

// PUT - Actualizar un chofer (requiere ID en la URL)
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

// DELETE - Eliminar un chofer (requiere ID en la URL)
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.driver.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Chofer eliminado" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al eliminar chofer" }, { status: 500 });
  }
}
