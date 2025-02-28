import { ModalBody, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Form, Alert } from "@heroui/react";
import { useState, useEffect } from "react";
import { useDriver } from "@/hooks/useDrivers";
import { mutate } from "swr";
import { Driver } from "./driverTypes";
 

interface UpdateModalProps {
  onClose: () => void;
  driverId?: number;
  currentPage: number;
}

export const UpdateModal = ({ onClose, driverId, currentPage }: UpdateModalProps) => {
  const { driver, isLoading, error, updateDriver } = useDriver(driverId);
  const [formData, setFormData] = useState<Driver | null>(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (driver) setFormData(driver);
  }, [driver]);

  useEffect(() => {
    if (isUpdated) {
      mutate(`/api/drivers?page=${currentPage}`);
      setTimeout(onClose, 1500);
    }
  }, [isUpdated, currentPage, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData!, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;
    const result = await updateDriver(formData);
    if (result.success) {
      setIsUpdated(true);
      console.log(`Chofer actualizado correctamente (Código: ${result.statusCode})`);
    } else {
      console.error(`Error al actualizar (Código: ${result.statusCode || "desconocido"})`);
    }
  };

  if (isLoading) return <p>Cargando datos del chofer...</p>;
  if (error) return <p>Error al cargar los datos</p>;

  return (
    <>
      {isUpdated ? (
        <>
          <ModalHeader>Modificar Chofer</ModalHeader>
          <ModalBody>
            <Alert variant="bordered"  color="success">
              Chofer actualizado correctamente!
            </Alert>
          </ModalBody>
        </>
      ) :
      <> 
      <ModalHeader>Modificar Chofer</ModalHeader>
      <ModalBody>
        {formData ? (
          <Form onSubmit={(e) => handleUpdate(e)}>
            <Input label="Legajo" readOnly defaultValue={formData.id.toString()} />
            <Input onChange={handleChange} name="name" label="Nombre" value={formData.name} />
            <Input onChange={handleChange} name="license" label="Licencia" value={formData.license} />
            <Input onChange={handleChange} name="startShift" label="Inicio del turno" value={formData.startShift} />
            <Input onChange={handleChange} name="endShift" label="Fin del turno" value={formData.endShift} />
            <Button variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Guardar cambios
            </Button>
          </Form>
        ) : (
          <p>No se encontró información del chofer.</p>
        )}
      </ModalBody>
      </>
      }
    </>
  );
};

