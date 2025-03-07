"use client";

import { useState } from "react";

import { Button } from "@/components/button/button";
import { useForm } from "@/hooks/useForm/useForm";

import Form from "@/components/form/form";
import Input from "@/components/input/input";

export default function Home() {
  const [nome, setNome] = useState("");

  const { handleFormSubmit } = useForm();

  return (
    <main className="w-full h-full bg-gray-950 flex justify-center items-center">
      <Form onSubmit={(event) => handleFormSubmit(event, nome)}>
        <Input
          type="text"
          name="nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Digite seu nome"
        />
        <Button type="submit" content="Ver Cartas" />
      </Form>
    </main>
  );
}
