import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderPgInicio from '../../componentes/HeaderPgInicio/HeaderPgInicio';
import ListaVideo from '../../componentes/ListaVideo/ListaVideo';
import './Inicial.css';

export default function Inicial() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://64c46d9b67cfdca3b660c40a.mockapi.io/produto/aluraFlix/?')
      .then((response) => {
        setData(response.data);
      })
      .catch((erro) => {
        setError(erro);
      });
  }, []);

  if (error) {
    return <div>Error al buscar datos de la API: {error.message}</div>;
  }

  // Obtener la lista de categorías únicas
  const categoriasUnicas = [...new Set(data.map((video) => video.categoriaId))];

  return (
    <>
      {/* Renderizar el componente HeaderPgInicio solo una vez fuera del bucle */}
      <HeaderPgInicio categoria="categoriaInicial" />

      {categoriasUnicas.map((categoriaId) => {
        const videosDaCategoria = data.filter((video) => video.categoriaId === categoriaId);
        return (
          <div key={categoriaId}>
            {/* Pasar los vídeos de la categoría al componente ListaVideo */}
            <ListaVideo categoria={videosDaCategoria} />
          </div>
        );
      })}
    </>
  );
}
