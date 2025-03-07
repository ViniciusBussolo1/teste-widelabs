import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export const useForm = () => {
  const router = useRouter();

  function handleFormSubmit(event: FormEvent<HTMLFormElement>, nome: string) {
    event.preventDefault();

    console.log(nome);

    if (nome.trim() === "") {
      alert("Digite um nome");
      return;
    }

    localStorage.setItem("nome", nome);

    router.push("/cartas");
  }

  return {
    handleFormSubmit,
  };
};
