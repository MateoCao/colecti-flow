import { Driver } from "@/components/driverTypes";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useDriver = (driverId?: number) => {
  const { data: driver, error, isLoading } = useSWR(
    driverId ? `/api/drivers/${driverId}` : null,
    fetcher
  );
  
  const updateDriver = async (updatedData: Driver) => {
    const response = await fetch(`/api/drivers/${updatedData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const statusCode = response.status;

    if (!response.ok) throw new Error(`Error ${statusCode}: No se pudo actualizar el chofer`);

    // Revalida los datos en caché (tabla y detalles del chofer)
    mutate(`/api/drivers`);
    mutate(`/api/drivers/${updatedData.id}`);

    return { success: true, statusCode };
  };

  const deleteDriver = async (driverId: number) => {
    const response = await fetch(`/api/drivers/${driverId}`, {
      method: "DELETE",
    });

    const statusCode = response.status;

    if (!response.ok) throw new Error(`Error ${statusCode}: No se pudo eliminar el chofer`);

    // Revalida los datos en caché (tabla y detalles del chofer)
    mutate(`/api/drivers`);
    mutate(`/api/drivers/${driverId}`);

    return { success: true, statusCode };
  };

  return { driver, isLoading, error, updateDriver, deleteDriver };
};
