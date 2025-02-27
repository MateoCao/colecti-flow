"use client";
import { Driver } from "./driverTypes";
import { Table, TableHeader, TableColumn, TableRow, TableCell, TableBody, getKeyValue } from "@heroui/table";
import { OptionsDropdown } from "./OptionsDropdown";
import useSWR from "swr";
import { useState } from "react";
import { Button } from "@heroui/button";
import { AddDriver } from "./addDriver";

// const formatDate = (date: Date) => {
//   return date.toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" });
// };

const columns = [
  { key: "id", label: "Legajo" },
  { key: "name", label: "Nombre" },
  { key: "license", label: "Licencia" },
  { key: "startShift", label: "Inicio del turno" },
  { key: "endShift", label: "Fin del turno" },
  { key:"options", label:"Opciones"}
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DriverTable = () => {
  const { data: drivers = [] } = useSWR("/api/drivers", fetcher);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!drivers) return <p>Cargando...</p>;


  return (
    <div className="">
      <Button onPress={() => setIsModalOpen(true)}>
        {isModalOpen ? "Cerrar" : "Agregar chofer"}
      </Button>
      {isModalOpen && <AddDriver onClose={() => setIsModalOpen(false)} />}
      <Table className="min-w-full">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={drivers}>
          {(driver: Driver) => (
            <TableRow key={driver.id}>
              {(columnKey) => (
                <TableCell>
                  {(() => {
                    switch (columnKey) {
                      case "options":
                        return <OptionsDropdown driverId={driver.id} />;
                      default:
                        return getKeyValue(driver, columnKey);
                    }
                  })()}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DriverTable;
