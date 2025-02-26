import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;    
    if (!id) {
      return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
    }

    const driverId = parseInt(id, 10);

    if (isNaN(driverId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) {
      return NextResponse.json({ error: "Chofer no encontrado" }, { status: 404 });
    }

    return NextResponse.json(driver);
  } catch (error) {
    console.error("Error obteniendo chofer:", error);
    return NextResponse.json(
      { error: "Error obteniendo chofer" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = await params;
      const driverId = Number(id);
      const { name, license, startShift, endShift } = await req.json();
  
      if (isNaN(driverId)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
      }
  
      const updatedDriver = await prisma.driver.update({
        where: { id: driverId },
        data: { name, license, startShift, endShift },
      });
  
      return NextResponse.json(updatedDriver);
    } catch (error) {
      console.error("Error actualizando chofer:", error);
      return NextResponse.json({ error: "Error actualizando chofer" }, { status: 500 });
    }
  }
