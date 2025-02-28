import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { useDriver } from "@/hooks/useDrivers";
import { mutate } from "swr";
import { useState } from "react";
import { Alert } from "@heroui/react";

interface DeleteModalProps {
    onClose: () => void;
    driverId?: number;
    currentPage: number;
}

export const DeleteModal = ({onClose, driverId, currentPage}: DeleteModalProps) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const { deleteDriver } = useDriver();

    const handleDelete = async () => {
        const result = await deleteDriver(driverId || 0);
        if (result.success) {
          setIsDeleted(true);  
          mutate(`/api/drivers?page=${currentPage}`);
          console.log(`Chofer eliminado correctamente (Código: ${result.statusCode})`);
        } else {
          console.error(`Error al eliminar (Código: ${result.statusCode || "desconocido"})`);
        }
    }

    return (
        <>
            {isDeleted ? (
                <>
                <ModalHeader>Chofer eliminado</ModalHeader>
                <ModalBody>
                    <Alert variant="bordered"  color="success">
                        Chofer eliminado correctamente
                    </Alert>
                </ModalBody>
                </>
            ) : 
            <>
                <ModalHeader>Eliminar Chofer</ModalHeader>
                <ModalBody>
                    <p>¿Seguro que querés eliminar el chofer con ID {driverId}?</p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={onClose}>
                        Cancelar
                    </Button>
                    <Button color="danger" onPress={handleDelete}>
                        Confirmar eliminación
                    </Button>
                </ModalFooter>
            </>
            }
        </>
    )
}