import DriverTable from "@/components/DriverTable";

export default function Choferes() {
    return (

            <section className="flex flex-col items-center justify-between w-full">
                <h1>Gestión de choferes</h1>
                <div className="w-full">
                    <DriverTable />
                </div>
            </section>
    );
}

