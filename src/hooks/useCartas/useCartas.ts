import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface CartasProps {
  id: number;
  name: string;
  desc: string;
  card_images: [{ image_url_cropped: string }];
  points: number;
}

export const useCartas = () => {
  async function getCartas(setCartas: Dispatch<SetStateAction<CartasProps[]>>) {
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

  async function getNewCarta(
    numberNewCartas: number,
    setNumberNewCartas: Dispatch<SetStateAction<number>>,
    setCartas: Dispatch<SetStateAction<CartasProps[]>>,
    cartas: CartasProps[]
  ) {
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

  async function shuffleCarta(
    cartas: CartasProps[],
    setCartas: Dispatch<SetStateAction<CartasProps[]>>
  ) {
    const shuffleCartas = cartas
      .sort(() => Math.random() - 0.5)
      .map((carta: CartasProps) => ({
        ...carta,
      }));

    setCartas(shuffleCartas);
  }

  return {
    getCartas,
    getNewCarta,
    shuffleCarta,
  };
};
