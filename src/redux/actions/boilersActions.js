import axios from 'axios';
import {
  CREATE_BOILER,
  UPDATE_BOILER,
  DELETE_BOILER,
  SET_ALL_BOILERS,
  SET_ERROR,
  SET_LOADING_TRUE,
} from '../types/boilersTypes';

export const createBoiler = (boiler) => {
  return {
    type: CREATE_BOILER,
    payload: boiler,
  };
};
export const updateBoiler = (boiler) => {
  return {
    type: UPDATE_BOILER,
    payload: boiler,
  };
};
export const deleteBoiler = (boilerId) => {
  return {
    type: DELETE_BOILER,
    payload: boilerId,
  };
};
export const setBolilers = (boilers) => {
  return {
    type: SET_ALL_BOILERS,
    payload: boilers,
  };
};
export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
    type: SET_LOADING_TRUE,
  };
};

export const getBoilersAsync = () => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.get('http://localhost:8090/calderas');
    if (res.status === 200) {
      let boilers = [];
      for (let i = 0; i < res.data.length; i++) {
        boilers.push(boilerMMapperToEnglish(res.data[i]));
      }
      dispatch(setBolilers(boilers));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deleteBoilerAsync = (boilerId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/calderas/${boilerId}`
    );
    if (res.status === 200) {
      dispatch(deleteBoiler(boilerId));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createBoilerAsync = (boiler) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const espBoiler = boilerMapperToSpanish(boiler);
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/calderas`,
      espBoiler
    );
    if (res.status === 201) {
      return dispatch(createBoiler(boilerMMapperToEnglish(res.data)));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
export const updateBoilerAsync = (bolier) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const espBoiler = boilerMapperToSpanish(bolier);
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/calderas/${bolier.id}`,
      espBoiler
    );
    if (res.status === 200) {
      return dispatch(updateBoiler(boilerMMapperToEnglish(res.data)));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};

const boilerMMapperToEnglish = (spanishBoil) => {
  return {
    id: spanishBoil._id,
    type: spanishBoil.tipo,
    isInstalled: spanishBoil.estaInstalada,
    maintenanceTimeMinutes: spanishBoil.tiempoMantenimientoMinutos,
    buildingId: spanishBoil.edificioId,
  };
};
const boilerMapperToSpanish = (englishBoil) => {
  return {
    _id: englishBoil.id,
    tipo: englishBoil.type,
    estaInstalada: englishBoil.isInstalled,
    tiempoMantenimientoMinutos: englishBoil.maintenanceTimeMinutes,
    edificioId: englishBoil.buildingId,
  };
};
