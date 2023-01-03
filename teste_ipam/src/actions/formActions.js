export const DEFINE_ESTADO = 'formActions/DEFINE_ESTADO';
export const DEFINE_MUNICIPIO = 'formActions/DEFINE_MUNICIPIO';
export const DEFINE_ESTADOAPI = 'formActions/DEFINE_ESTADOAPI';
export const DEFINE_MUNICIPIOAPI = 'formActions/DEFINE_MUNICIPIOAPI';
export const DEFINE_DISTRITOAPI = 'formActions/DEFINE_DISTRITOAPI';

export const defineEstado = (valor) => {
  return {
    type:DEFINE_ESTADO,
    estado:valor
  }
};

export const defineMunicipio = (valor) => {
  return {
    type:DEFINE_MUNICIPIO,
    municipio:valor
  }
};

export const defineEstadoAPI = (valor) => {
  return {
    type:DEFINE_ESTADOAPI,
    estadoAPI:valor
  }
};

export const defineMunicipioAPI = (valor) => {
  return {
    type:DEFINE_MUNICIPIOAPI,
    municipioAPI:valor
  }
};

export const defineDistritoAPI = (valor) => {
  return {
    type:DEFINE_DISTRITOAPI,
    distritoAPI:valor
  }
};