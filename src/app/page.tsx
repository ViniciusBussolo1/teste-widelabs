export default function Home() {
  return (
    <main className="w-screen h-screen bg-gray-950 flex justify-center items-center">
      <form className="bg-gray-800 w-96 p-6 rounded-lg ">
        <input
          type="text"
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
