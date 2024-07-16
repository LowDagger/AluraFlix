import { Button, TextField } from '@mui/material';
import './AddCategoria.css';

import { useState } from 'react';
import axios from 'axios';

export default function AddCategoria(props) {

    const [campoTitulo, setCampoTitulo] = useState();
    const [campoDescricao, setCampoDescricao] = useState();
    const [campoCor, setCampoCor] = useState();
    const [campoid, setCampoId] = useState();

    let addCateg = {
        id: campoid,
        titulo: campoTitulo,
        cor: campoCor,
        descricao: campoDescricao
    };

    function enviar() {
        axios.post(`http://localhost:3000/categorias`, addCateg)
            .then((response) => {
                console.log('Nueva categoría añadida con éxito:', response.data);
                // Hacer lo que sea necesario después del éxito de la solicitud
            })
            .catch((error) => {
                console.error('Error al añadir nueva categoría:', error);
                // Manejar el error de alguna forma
            });
    }

    function limpiar() {
        setCampoTitulo('');
        setCampoDescricao('');
        setCampoCor('');
        setCampoId('');
    }

    return (
        <main className='containerAddCategoria'>
            <h1>Añadir Categoría</h1>
            <div>
                <TextField fullWidth id="filled-basic" label="Título" variant="filled" margin="normal" value={campoTitulo} onChange={(e) => setCampoTitulo(e.target.value)} />
                <TextField fullWidth id="filled-basic" label="Descripción" variant="filled" multiline minRows={4} margin="normal" value={campoDescricao} onChange={(e) => setCampoDescricao(e.target.value)} />
                <TextField fullWidth id="filled-basic" type={"color"} label="Color" variant="filled" margin="normal" value={campoCor} onChange={(e) => setCampoCor(e.target.value)} />
                <TextField fullWidth id="filled-basic" label="Código de seguridad" variant="filled" margin="normal" value={campoid} onChange={(e) => setCampoId(e.target.value)} />
                <div className='buttonContainer'>
                    <div className='groupButtons'>
                        <Button variant="contained" onClick={enviar}>Guardar</Button>
                        <Button variant="contained" onClick={limpiar} color='inherit'>Limpiar</Button>
                    </div>
                    <Button variant="contained" onClick={props.voltarPagina} color='inherit'>Volver</Button>
                </div>
            </div>
        </main>
    );
}
