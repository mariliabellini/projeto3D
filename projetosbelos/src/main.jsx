import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Cria a "raiz" da aplicação React no DOM do navegador, utilizando o elemento com o ID "root".

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

  // O React.StrictMode é um componente que ajuda a detectar problemas no código.
  // Ele ativa verificações adicionais e avisos durante o desenvolvimento.
  // Por exemplo, ele pode avisar sobre o uso de métodos ou práticas obsoletas.