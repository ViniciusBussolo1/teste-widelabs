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
  points: number;
}

export default function Cartas() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [cartas, setCartas] = useState<CartasProps[]>([]);
  const [numberNewCartas, setNumberNewCartas] = useState(0);

  async function getCartas() {
    const response = await axios.get(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php"
    );

    const cartasAleatorias: CartasProps[] = [];

    for (let i = 0; i < 5; i++) {
      const carta = Math.floor(Math.random() * response.data.data.length);
      cartasAleatorias.push({
        ...response.data.data[carta],
        points: Math.floor(Math.random() * 11),
      });

      cartasAleatorias.splice(carta, 1);
    }

    setCartas(cartasAleatorias);
  }

  async function getNewCarta() {
    if (numberNewCartas >= 3) {
      return;
    }

    const response = await axios.get(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php"
    );

    const carta = Math.floor(Math.random() * response.data.data.length);
    const newCarta = {
      ...response.data.data[carta],
      points: Math.floor(Math.random() * 11),
    };

    setNumberNewCartas(numberNewCartas + 1);
    setCartas([...cartas, newCarta]);
  }

  async function shuffleCarta() {
    const shuffleCartas = cartas
      .sort(() => Math.random() - 0.5)
      .map((carta: CartasProps) => ({
        ...carta,
      }));

    setCartas(shuffleCartas);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const nome = localStorage.getItem("nome");

        if (!nome) {
          router.push("/");
          return;
        }

        setNome(nome);

        await getCartas();
      }
    };

    fetchData();
  }, [router]);

  return (
    <main className="w-full min-h-screen bg-gray-950">
      <header className="w-full p-4 pr-6 flex items-center justify-between ">
        <div className="flex-1 flex items-center justify-center gap-3">
          <button
            type="button"
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer disabled:bg-blue-950 disabled:cursor-not-allowed"
            onClick={getNewCarta}
            disabled={numberNewCartas >= 3}
          >
            Nova Carta
          </button>
          <button
            type="button"
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
            onClick={shuffleCarta}
          >
            Embaralhar Cartas
          </button>
        </div>
        <h1 className="text-white">{nome}</h1>
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
                  priority
                  className="rounded-t-lg w-[200px] h-[300px]"
                />
                <h2 className="text-white text-xl mt-2">{carta.name}</h2>
                <p className="text-gray-400 text-sm">{carta.desc}</p>
              </div>
              <div className="w-full text-start">
                <span className="text-white text-base text-start">
                  Pontos: {carta.points}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
