import Image from "next/image";

interface ItemsCartasProps {
  name: string;
  desc: string;
  card_images: string;
  points: number;
}

export function ItemsCartas({
  name,
  desc,
  card_images,
  points,
}: ItemsCartasProps) {
  return (
    <div className="w-80 h-full bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center justify-between space-y-2.5">
      <div className="space-y-2.5 flex flex-col items-center">
        <Image
          src={card_images}
          alt={name}
          width={200}
          height={300}
          priority
          className="rounded-t-lg w-[200px] h-[300px]"
        />
        <h2 className="text-white text-xl mt-2">{name}</h2>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>
      <div className="w-full text-start">
        <span className="text-white text-base text-start">
          Pontos: {points}
        </span>
      </div>
    </div>
  );
}
