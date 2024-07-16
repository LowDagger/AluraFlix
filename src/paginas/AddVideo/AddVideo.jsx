import React, { useState } from 'react';
import { Button, MenuItem, TextField } from '@mui/material';
import './AddVideo.css';
import axios from 'axios';

export default function AddVideo(props) {
  const [campoTitulo, setCampoTitulo] = useState('');
  const [campoLinkVideo, setCampoLinkVideo] = useState('');
  const [campoCapa, setCampoCapa] = useState('');
  const [campoCategoria, setCampoCategoria] = useState('');
  const [campoDescricao, setCampoDescricao] = useState('');
  const [campoId, setCampoId] = useState('');

  const categorias = [
    { id: 1, titulo: 'Front end' },
    { id: 2, titulo: 'Back end' },
    { id: 3, titulo: 'Base de datos' },
    { id: 4, titulo: 'Móvil' },
    { id: 5, titulo: 'Dev Ops' },
    { id: 6, titulo: 'Full Stack' },
    { id: 7, titulo: 'Programación' },
    // Añade más categorías según sea necesario
  ];

  // Función para encontrar el nombre de la categoría basado en el ID
  const findCategoriaNome = (categoriaId) => {
    const categoria = categorias.find((cat) => cat.id === categoriaId);
    return categoria ? categoria.titulo : '';
  };

  let video = {
    id: campoId,
    titulo: campoTitulo,
    link: campoLinkVideo,
    capa: campoCapa,
    categoriaId: findCategoriaNome(campoCategoria),
    descricaoId: `Lo mejor de ${findCategoriaNome(campoCategoria)}`,
    descricao: campoDescricao,
  };

  function submit() {
    axios
      .post('https://64c46d9b67cfdca3b660c40a.mockapi.io/produto/aluraFlix', video)
      .then((response) => {
        console.log('Nuevo video añadido con éxito:', response.data);
        // Hacer lo que sea necesario después del éxito de la solicitud
      })
      .catch((error) => {
        console.error('Error al añadir nuevo video:', error);
        // Manejar el error de alguna forma
      });
  }

  function limpiar() {
    setCampoTitulo('');
    setCampoLinkVideo('');
    setCampoCapa('');
    setCampoCategoria('');
    setCampoDescricao('');
    setCampoId('');
  }

  return (
    <main className="containerAddVideo">
      <h1>Añadir Video</h1>
      <div>
        <TextField
          fullWidth
          id="filled-basic"
          color="info"
          label="Título"
          variant="filled"
          margin="normal"
          value={campoTitulo}
          onChange={(e) => setCampoTitulo(e.target.value)}
        />
        <TextField
          fullWidth
          id="filled-basic"
          label="Link del video"
          variant="filled"
          margin="normal"
          value={campoLinkVideo}
          onChange={(e) => setCampoLinkVideo(e.target.value)}
        />
        <TextField
          fullWidth
          id="filled-basic"
          label="Link de la imagen del video"
          variant="filled"
          margin="normal"
          value={campoCapa}
          onChange={(e) => setCampoCapa(e.target.value)}
        />
        <TextField
          select
          fullWidth
          id="filled-basic"
          label="Elige una categoría"
          variant="filled"
          margin="normal"
          value={campoCategoria}
          onChange={(e) => setCampoCategoria(e.target.value)}
        >
          {categorias.map((catg) => (
            <MenuItem key={catg.id} value={catg.id}>
              {catg.titulo}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          id="filled-basic"
          label="Descripción"
          variant="filled"
          multiline
          minRows={4}
          margin="normal"
          value={campoDescricao}
          onChange={(e) => setCampoDescricao(e.target.value)}
        />
        <TextField
          fullWidth
          id="filled-basic"
          label="Código de seguridad"
          variant="filled"
          margin="normal"
          value={campoId}
          onChange={(e) => setCampoId(e.target.value)}
        />
        {/* Mostrar el nombre de la categoría basado en el ID seleccionado */}
        <TextField
          fullWidth
          id="categoriaNome"
          label="Categoría Seleccionada"
          variant="filled"
          margin="normal"
          value={findCategoriaNome(campoCategoria)}
          disabled
        />
      </div>
      <div className="buttonsContainer">
        <div className="groupButtons">
          <Button variant="contained" onClick={submit}>
            Guardar
          </Button>
          <Button variant="contained" onClick={limpiar} color="inherit">
            Limpiar
          </Button>
        </div>

        <div className="groupButtons">
          <Button variant="contained" color="inherit" onClick={props.voltarPagina}>
            Volver a la página
          </Button>
          {/* <Button variant="contained"  onClick={props.proximaPagina}>Nueva Categoría</Button>*/}
        </div>
      </div>
    </main>
  );
}
