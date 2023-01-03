import * as actions from '../actions'

const initialState = {
  estado:"", 
  municipio:"", 
  estadoAPI:[],     // Este objeto é o estado inicial do reducer
  municipioAPI:[],
  distritoAPI:[]
};

const formReducer = (state = initialState, action) => {
  if (action.type === actions.DEFINE_ESTADO) {
    return {
      ...state, estado:action.estado  // 
    }
  }
  else if (action.type === actions.DEFINE_MUNICIPIO) {
    return {
      ...state, municipio:action.municipio
    }
  }
  else if (action.type === actions.DEFINE_ESTADOAPI) {
    return {
      ...state, estadoAPI:action.estadoAPI
    }
  }
  else if (action.type === actions.DEFINE_MUNICIPIOAPI) {
    return {
      ...state, municipioAPI:action.municipioAPI
    }
  }
  else if (action.type === actions.DEFINE_DISTRITOAPI) {
    return {
      ...state, distritoAPI:action.distritoAPI
    }
  }
  else {
    return state;
  }
}

export default formReducer;