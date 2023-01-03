import { Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { defineDistritoAPI, defineEstado, defineEstadoAPI, defineMunicipio, defineMunicipioAPI } from "../actions";

export default function Form() {

  const dispatch = useDispatch();
  const {estado, municipio, estadoAPI, municipioAPI, distritoAPI} = useSelector(state => state.form);
// const [estado, setEstado] = useState(""); // useState que recebe o value do seletor de estado
//  const [municipio, setMunicipio] = useState(""); // useState que recebe o value do seletor de município
// const [estadoAPI, setEstadoAPI] = useState([]); // useState que recebe a requisição do fetch da API e retorna os objetos de cada estado
//  const [municipioAPI, setMunicipioAPI] = useState([]); // useState que recebe a requisição do fetch da API e retorna os objetos de cada município
// const [distritoAPI, setDistritoAPI] = useState([]); // useState que recebe a requisição do fetch da API e retorna os objetos da mesoregião e da microregião

  const urlEstado = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  useEffect(() => {
    fetch(urlEstado)
      .then((response) => response.json())
      .then((json) => dispatch(defineEstadoAPI(json)));
  }, []);

  const urlMunicipio = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;
  useEffect(() => {
    fetch(urlMunicipio)
      .then((response) => response.json())
      .then((json) => dispatch(defineMunicipioAPI(json)));
  }, [estado]);

  const urlDistrito = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${municipio}/distritos`;
  useEffect(() => {
    fetch(urlDistrito)
      .then((response) => response.json())
      .then((json) => dispatch(defineDistritoAPI(json)));
  }, [municipio]);

  const mostraEstado = estadoAPI.map(item => { // map para retornar somente o nome e a sigla dos objetos dos estados
    return {
      nome: item.nome,
      sigla: item.sigla
    }
  });

  const seletorDeEstado = mostraEstado.map(item => { // Variável que retorna os seletores de estados já mapeados 
    return (
      <MenuItem key={item.sigla} value={item.sigla}>{item.nome}</MenuItem>
    )
  });

  const mostraMunicipio = municipioAPI.map(item => { // map para retornar somente o nome e a id do objeto dos municípios
    return {
      nome: item.nome,
      id: item.id
    }
  });

  const seletorDeMunicipio = mostraMunicipio.map(item => { // // Variável que retorna os seletores de municípios já mapeados 
    return (
      <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
    )
  });

  const mostraMicroMesoRegiao = distritoAPI.map(item => { // map para retornar somente o nome e a micro e a meso região
    return {
      microregiao: item.municipio.microrregiao.nome,
      mesoregiao: item.municipio.microrregiao.mesorregiao.nome,
      uf: item.municipio.microrregiao.mesorregiao.UF.sigla,
      nome: item.nome,
      regiao: item.municipio.microrregiao.mesorregiao.UF.regiao.nome
    }
  });

  // const mostrarRegiao = mostraMunicipio.map(item => { 
  //   return (
  //     item.regiao
  //   )
  // });

  // const mostrarUF = mostraMunicipio.map(item => { 
  //   return (
  //     item.uf
  //   )
  // });

  // const mostrarMicroregiao = mostraMicroMesoRegiao.map(item => {
  //   return (
  //     item.microregiao
  //   )
  // });

  // const mostrarMesoregiao = mostraMicroMesoRegiao.map(item => {
  //   return (
  //     item.mesoregiao
  //   )
  // });
  
  // console.log(mostrarRegiao);
  // console.log(mostrarUF);

  function createData(nomeMunicipio, municipioUF, microregiaoMunicipio, mesoregiaoMunicipio, regiaoMunicipio) {
    return { nomeMunicipio, municipioUF, microregiaoMunicipio, mesoregiaoMunicipio, regiaoMunicipio };
  }

  // const rows = [
  //   createData('Nome Município', 'UF', `${mostrarMicroregiao}`, `${mostrarMesoregiao}`, `regiao`),
  // ];

  const rows = mostraMicroMesoRegiao.map(item =>
    createData(item.nome, item.uf, item.microregiao, item.mesoregiao, item.regiao),
  );

  return (
    <div>
      <Container>
        <h1>Formulário</h1>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField fullWidth id="standard-basic" label="Nome" variant="filled" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth id="standard-basic" label="Email" variant="filled" />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="label-seletor-estado">
                Estado
              </InputLabel>
              <Select
                labelID="label-seletor-estado"
                id="seletor-estado"
                value={estado}
                label="Estado"
                onChange={(e) => dispatch(defineEstado(e.target.value))}>
                {seletorDeEstado}

              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="label-seletor-municipio">
                Município
              </InputLabel>
              <Select
                labelID="label-seletor-municipio"
                id="seletor-municipio"
                value={municipio}
                label="Municipio"
                disabled={estado == ""}
                onChange={(e) => dispatch(defineMunicipio(e.target.value))}>
                {seletorDeMunicipio}

              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ marginTop: 3 }}>
        <Grid container spacing={1}>
          <Grid item md={12} xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Distrito</b></TableCell>
                    <TableCell align="right"><b>UF</b></TableCell>
                    <TableCell align="right"><b>Microregião</b></TableCell>
                    <TableCell align="right"><b>Mesoregião</b></TableCell>
                    <TableCell align="right"><b>Região</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.nomeMunicipio}</TableCell>
                      <TableCell align="right">{row.municipioUF}</TableCell>
                      <TableCell align="right">{row.microregiaoMunicipio}</TableCell>
                      <TableCell align="right">{row.mesoregiaoMunicipio}</TableCell>
                      <TableCell align="right">{row.regiaoMunicipio}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}