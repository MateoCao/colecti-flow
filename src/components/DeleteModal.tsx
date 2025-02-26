import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";

interface DeleteModalProps {
    onClose: () => void;
    driverId?: number;
}

export const DeleteModal = ({onClose, driverId}: DeleteModalProps) => {

    return (
        <>
            <ModalHeader>Eliminar Chofer</ModalHeader>
            <ModalBody>
                <p>¿Seguro que querés eliminar el chofer con ID {driverId}?</p>
            </ModalBody>
            <ModalFooter>
                <Button variant="light" onPress={onClose}>
                    Cancelar
                </Button>
                <Button color="danger" onPress={() => console.log(`Eliminar chofer ${driverId}`)}>
                    Confirmar eliminación
                </Button>
            </ModalFooter>
        </>
    )
}