"use client";

import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { VerticalDotsIcon } from "@/public/VerticalDots";
import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import { UpdateModal } from "./UpdateModal";
import { DeleteModal } from "./DeleteModal";

interface OptionsDropdownProps {
  driverId?: number;
}

export const OptionsDropdown = ({ driverId }: OptionsDropdownProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState<"update" | "delete" | null>(null);

  const handleAction = (key: string | number) => {
    if (!driverId) return;
    setModalType(key as "update" | "delete");
    onOpen();
  };

  return (
    <>
      <Dropdown aria-label="Static Actions">
        <DropdownTrigger>
          <Button aria-label="Open menu" className="bg-white">
            <VerticalDotsIcon size={22} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" onAction={handleAction}>
          <DropdownItem key="update">Modificar</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {modalType === "update" ? (
                <UpdateModal onClose={onClose} driverId={driverId} />
              ) : modalType === "delete" ? (
                <DeleteModal onClose={onClose} driverId={driverId} />
              ) : null}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
