"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/button/button";
import { ItemsCartas } from "@/components/items-cartas/items-cartas";

import { useCartas } from "@/hooks/useCartas/useCartas";

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
  const [isLoading, setIsLoading] = useState(true);

  const { getCartas, getNewCarta, shuffleCarta } = useCartas();

  useEffect(() => {
    const fetchData = async () => {
      const nome = localStorage.getItem("nome");

      if (!nome) {
        router.push("/");
        return;
      }

      setNome(nome);

      await getCartas(setCartas);
      setIsLoading(false);
    };

    fetchData();
  }, [router]);

  return (
    <main className="w-full min-h-screen bg-gray-950 flex flex-col">
      <header className="w-full p-4 pr-6 flex items-center justify-between ">
        <div className="flex-1 flex items-center justify-center gap-3">
          <Button
            type="button"
            content="Nova Carta"
            className="disabled:bg-blue-950 disabled:cursor-not-allowed"
            onClick={() =>
              getNewCarta(
                numberNewCartas,
                setNumberNewCartas,
                setCartas,
                cartas
              )
            }
            disabled={numberNewCartas >= 3}
          />
          <Button
            type="button"
            content="Embaralhar Cartas"
            onClick={() => shuffleCarta(cartas, setCartas)}
          />
        </div>
        <h1 className="text-white">{nome}</h1>
      </header>

      <div className="w-full flex-1 flex justify-center items-center">
        {isLoading ? (
          <div className="text-white h-full">Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {cartas.map((carta) => (
              <ItemsCartas
                key={carta.id}
                name={carta.name}
                desc={carta.desc}
                card_images={carta.card_images[0].image_url_cropped}
                points={carta.points}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
