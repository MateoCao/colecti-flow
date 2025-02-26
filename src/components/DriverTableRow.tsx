"use client"

import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Driver } from "./driverTypes";

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
};

const DriverTableRow = ({ driver }: { driver: Driver }) => {
  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="p-3">{driver.id}</td>
      <td className="p-3">{driver.name}</td>
      <td className="p-3">{driver.license}</td>
      <td className="p-3">{formatTime(driver.startShift)} - {formatTime(driver.endShift)}</td>
      <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </tr>
  );
};

export default DriverTableRow;
