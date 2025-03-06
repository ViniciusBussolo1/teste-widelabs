"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [nome, setNome] = useState("");

  function handleFormSubimit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (nome.trim() === "") {
      alert("Digite um nome");
      return;
    }

    localStorage.setItem("nome", nome);

    router.push("/cartas");
  }

  return (
    <main className="w-screen h-screen bg-gray-950 flex justify-center items-center">
      <form
        className="bg-gray-800 w-96 p-6 rounded-lg"
        onSubmit={handleFormSubimit}
      >
        <input
          type="text"
          name="nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Digite seu nome"
          className="w-full p-2 mb-4 text-white placeholder-gray-500 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
        >
          Ver Cartas
        </button>
      </form>
    </main>
  );
}
