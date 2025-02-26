import { ModalBody, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Form, Alert } from "@heroui/react";
import { useState, useEffect } from "react";
import { useDriver } from "@/hooks/useDrivers";
 

interface UpdateModalProps {
  onClose: () => void;
  driverId?: number;
}

export const UpdateModal = ({ onClose, driverId }: UpdateModalProps) => {
  const { driver, isLoading, error, updateDriver } = useDriver(driverId);
  const [isUpdated, setIsUpdated] = useState(false);

  const [formData, setFormData] = useState({
    id: driverId || 0,
    name: "",
    license: "",
    startShift: "",
    endShift: "",
  });

  useEffect(() => {
    if (driver) {
      setFormData({
        id: driver.id || 0,
        name: driver.name || "",
        license: driver.license || "",
        startShift: driver.startShift || "",
        endShift: driver.endShift || "",
      });
    }
  }, [driver]);

  useEffect(() => {
    if (isUpdated) {
      const closeTimeout = setTimeout(() => {
        onClose();
        const resetTimeout = setTimeout(() => setIsUpdated(false), 500);
        return () => clearTimeout(resetTimeout);
      }, 3000);
      return () => clearTimeout(closeTimeout);
    }
  }, [isUpdated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        {driver ? (
          <Form onSubmit={(e) => handleUpdate(e)}>
            <Input label="Legajo" readOnly defaultValue={driver.id} />
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
