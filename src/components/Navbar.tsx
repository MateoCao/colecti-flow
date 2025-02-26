import Link from "next/link";

export default function Navbar() {
    return (
        <aside className="flex justify-center bg-gray-200">
            <div className="flex my-auto flex-col items-center gap-10 p-7 h-5/6">
                <div className="">
                    <h2 className="text-3xl">Citaciones colectivos</h2>
                </div>
                <ul className="flex flex-col justify-around items-center text-2xl text-black h-1/4">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/choferes">Choferes</Link>
                    </li>
                    <li>
                        <Link href="/Asignaciones">Asignaciones</Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
  }