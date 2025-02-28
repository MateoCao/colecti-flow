"use client";
import { Driver } from "./driverTypes";
import { Table, TableHeader, TableColumn, TableRow, TableCell, TableBody, getKeyValue } from "@heroui/table";
import { Pagination, Spinner } from "@heroui/react";
import { OptionsDropdown } from "./OptionsDropdown";
import useSWR from "swr";
import { useState, useMemo } from "react";
import { Button } from "@heroui/button";
import { AddDriver } from "./addDriver";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const { data, isLoading, error } = useSWR(
    `/api/drivers?page=${page}`,
    fetcher,
    { keepPreviousData: true }
  );

  const pages = useMemo(() => {
    return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
  }, [data?.total, rowsPerPage]); 

  const loadingState = isLoading || data?.data.length == 0 ? "loading" : "idle";

  if (error) return <p>Ha ocurrido un error: {error}</p>;

  return (
    <div className="">
      <Button onPress={() => setIsModalOpen(true)}>
        {isModalOpen ? "Cerrar" : "Agregar chofer"}
      </Button>
      {isModalOpen && <AddDriver currentPage={page} onClose={() => setIsModalOpen(false)} />}
      <Table className="min-w-full"
        aria-label="Drivers table"
        bottomContent={
          <Pagination
            isCompact
            showControls
            showShadow
            page={page}
            total={pages}
            onChange={(newPage) => setPage(newPage)}
          />
        }
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody 
          items={data?.data ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(driver: Driver) => (
            <TableRow key={driver.id}>
              {(columnKey) => (
                <TableCell>
                  {(() => {
                    switch (columnKey) {
                      case "options":
                        return <OptionsDropdown currentPage={page} driverId={driver.id} />;
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
