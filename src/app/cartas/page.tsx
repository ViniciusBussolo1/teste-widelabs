"use client";

import axios from "axios";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CartasProps {
  id: number;
  name: string;
  desc: string;
  card_images: [{ image_url_cropped: string }];
}

export default function Cartas() {
  const router = useRouter();

  const [cartas, setCartas] = useState<CartasProps[]>([]);

  async function getCartas() {
    const response = await axios.get(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php"
    );

    const cartasAleatorias: CartasProps[] = [];

    for (let i = 0; i < 5; i++) {
      const carta = Math.floor(Math.random() * response.data.data.length);
      cartasAleatorias.push(response.data.data[carta]);

      cartasAleatorias.splice(carta, 1);
    }

    setCartas(cartasAleatorias);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const nome = localStorage.getItem("nome");

      if (nome === null) {
        return router.push("/");
      }

      getCartas();
    }
  }, [router]);

  return (
    <main className="w-full min-h-screen bg-gray-950">
      <header className="w-full p-4 pr-6 flex items-center justify-end">
        <h1 className="text-white">Vinicius</h1>
      </header>

      <div className="h-full w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {cartas.map((carta) => (
            <div
              key={carta.id}
              className="w-80 h-full bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center justify-between space-y-2.5"
            >
              <div className="space-y-2.5 flex flex-col items-center">
                <Image
                  src={carta.card_images[0].image_url_cropped}
                  alt={carta.name}
                  width={200}
                  height={300}
                  className="rounded-t-lg"
                />
                <h2 className="text-white text-xl mt-2">{carta.name}</h2>
                <p className="text-gray-400 text-sm">{carta.desc}</p>
              </div>
              <div className="w-full text-start">
                <span className="text-white text-base text-start">
                  Pontos: {Math.floor(Math.random() * 11)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
