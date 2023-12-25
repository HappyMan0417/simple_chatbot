import React from "react";
import Chatbot from "../chatbot";

const Home = () => {
  return (
    <main className="flex flex-col h-full md:py-10 py-4 px-2 md:px-0">
      <section className="flex-grow">
        <Chatbot className="h-full" />
      </section>
    </main>
  );
};

export default Home;
