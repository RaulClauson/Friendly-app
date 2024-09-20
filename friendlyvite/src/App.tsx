import { useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import Footer from "./Components/Rodape/Rodape";
import Tela_Carregamento from "./Components/Tela_Carregamento/Tela_Carregamento";
import Friendly from "./Pages/Friendly/Friendly";

function App() {
  //=============================
  //===========BACKEND===========
  //=============================

  const [array,setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:8080/api/users");
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI()
  },[]);



  //============================
  //===========OUTROS===========
  //============================

  const [, setDarkMode] = useState(false);

  // Verificar se o usuário já havia escolhido o modo escuro anteriormente
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simular carregamento de recursos com fetch ou Promise
        const fetchData = new Promise((resolve) => {
          const intervalId = setInterval(() => {
            setProgress((prevProgress) => {
              const newProgress = prevProgress + 10;
              if (newProgress >= 100) {
                clearInterval(intervalId);
                resolve(true);
              }
              return newProgress;
            });
          }, 100);
        });

        await fetchData;

        // Após o carregamento, aguardar um tempo mínimo para garantir a visibilidade da tela de carregamento
        setTimeout(() => {
          setLoading(false);
        }, 500); // tempo de carregamento mínimo de 500ms
      } catch (error) {
        console.error("Error during loading:", error);
        setLoading(false); // Em caso de erro, também remover a tela de carregamento
      }
    };

    loadData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Tela_Carregamento loading={loading} progress={progress} />
        {!loading && (
          <>
            <Menu />
            <section className="section">
              <Routes>
                <Route path="/" element={<Friendly />} />
              </Routes>
              <Footer />
            </section>
          </>
        )}
      </BrowserRouter>
    <h1>
      <p>
        {
          array.map((user, index) => (
            <div key={index}>
            <span>{user}</span>
            <br />
            </div>
          ))
        }
      </p>
    </h1>
    </>
  )
}

export default App
