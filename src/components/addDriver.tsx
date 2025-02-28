import { Button } from "@heroui/button"
import { useState } from "react";
import { mutate } from "swr";
import { Input } from "@heroui/react";

interface AddDriverProps {
    onClose: () => void;
    currentPage: number;
}

export const AddDriver = ({onClose, currentPage}: AddDriverProps) => {
    const [name, setName] = useState("");
    const [license, setLicense] = useState("");
    const [id, setId] = useState<number | null>(null);
    const [startShift, setStartShift] = useState("");
    const [endShift, setEndShift] = useState("");
    const addDriver = async () => {
        if (!name || !license) return;

        const newDriver = { id, name, license, startShift, endShift };
    
        try {
            const res = await fetch("../api/drivers", {
              method: "POST",
              body: JSON.stringify(newDriver),
              headers: { "Content-Type": "application/json" },
            });
      
            if (!res.ok) throw new Error("Error al agregar chofer");

            mutate(`/api/drivers?page=${currentPage}`);

      
                setName("");
                setLicense("");
                setId(null);
                setStartShift("");
                setEndShift("");
        } catch (error) {
            console.error(error);
            console.log("Hubo un error al agregar el chofer.");
        }
        
    } 

    return (
    <div>
        <Button onPress={onClose}>Cancelar</Button>
        <Input
            label="Legajo"
            value={id !== null ? id.toString() : ""}
            type="number"
            onChange={(e) => setId(e.target.value ? parseInt(e.target.value) : null)}
            />
        <Input label="Nombre" value={name} type="string" onChange={(e) => setName(e.target.value)} />
        <Input label="Licencia" value={license} type="string" onChange={(e) => setLicense(e.target.value)} />
        <Input label="Inicio del turno" value={startShift} type="string" onChange={(e) => setStartShift(e.target.value)} />
        <Input label="Fin del turno" value={endShift} type="string" onChange={(e) => setEndShift(e.target.value)} />
        <Button onPress={addDriver}>Agregar</Button>
    </div>  
    )
}
