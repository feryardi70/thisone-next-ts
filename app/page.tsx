import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import getSession from "./session";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-wrap flex-row">
      <div className="sm:hidden md:inline w-1/6 bg-blue-700 h-screen">
        <div className="text-white text-2xl tracking-wide">
          <div className="ml-5 mt-3 text-yellow-300">Side Bar</div>
          <div className="ml-5 mt-3 hover:bg-fuchsia-600">
            <Link href="/departure" target="_blank">
              Departure Dashboard
            </Link>
          </div>
          <div className="ml-5 mt-3 hover:bg-fuchsia-600">
            <Link href="/arrival" target="_blank">
              Arrival Dashboard
            </Link>
          </div>
          <div className="ml-5 mt-3 hover:bg-fuchsia-600">
            <Link href="/wisata" target="_blank">
              8 Wisata di Nias
            </Link>
          </div>
        </div>
      </div>
      <div className="w-5/6 bg-nias">
        <div className="min-h-16 flex flex-row justify-between px-5 items-center border-b-2 border-b-red-600">
          <div className="ml-5 text-4xl text-transparent tracking-wide bg-clip-text bg-gradient-to-r from-blue-900 to-black">FLIGHT DASHBOARD</div>
          <div className="min-w-20 py-2 bg-fuchsia-600 text-center rounded">
            <Link href="/api/auth/signout" className="px-2 text-base text-white" rel="noopener noreferrer">
              logout
            </Link>
          </div>
        </div>
        <div className="max-w-max ml-10 mt-2 text-white tracking-wide text-3xl bg-fuchsia-600 ">OVERVIEW</div>
        <div className="cards flex flex-row ml-10 mt-5 justify-evenly">
          <div className="card flight-status">
            <Link href="/departure" target="_blank" rel="noopener noreferrer">
              <Image className="rounded-lg img-depart" src="/img/departure2.jpg" alt="Departure Image" width={400} height={300}></Image>
            </Link>
            <Link href="/departure" target="_blank" rel="noopener noreferrer">
              <h3 className="text-center text-white text-3xl bg-blue-600 py-2">Manage Departure</h3>
            </Link>
          </div>
          <div className="card weather">
            <Link href="/arrival" target="_blank" rel="noopener noreferrer">
              <Image className="rounded-lg img-depart" src="/img/arrival2.jpg" alt="Departure Image" width={400} height={300}></Image>
            </Link>
            <Link href="/arrival" target="_blank" rel="noopener noreferrer">
              <h3 className="text-center text-white text-3xl bg-blue-600 py-2">Manage Arrival</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
