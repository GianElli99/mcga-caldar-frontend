import axios from 'axios';
import {
  BOIL_CREATE_BOILER,
  BOIL_UPDATE_BOILER,
  BOIL_DELETE_BOILER,
  BOIL_SET_ALL_BOILERS,
  BOIL_SET_ERROR,
  BOIL_SET_LOADING_TRUE,
  BOIL_SET_CREATE_ACTION,
  BOIL_SET_DELETE_ACTION,
  BOIL_UNSET_ACTION,
  BOIL_SET_UPDATE_ACTION,
} from '../types/boilersTypes';

export const createBoiler = (boiler) => {
  return {
    type: BOIL_CREATE_BOILER,
    payload: boiler,
  };
};
export const updateBoiler = (boiler) => {
  return {
    type: BOIL_UPDATE_BOILER,
    payload: boiler,
  };
};
export const deleteBoiler = (boilerId) => {
  return {
    type: BOIL_DELETE_BOILER,
    payload: boilerId,
  };
};
export const setBolilers = (boilers) => {
  return {
    type: BOIL_SET_ALL_BOILERS,
    payload: boilers,
  };
};
export const setError = (error) => {
  return {
    type: BOIL_SET_ERROR,
    payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
    type: BOIL_SET_LOADING_TRUE,
  };
};
export const setCreateAction = () => {
  return {
    type: BOIL_SET_CREATE_ACTION,
  };
};
export const setUpdateAction = (boiler) => {
  return {
    type: BOIL_SET_UPDATE_ACTION,
    payload: boiler,
  };
};
export const setDeleteAction = (boiler) => {
  return {
    type: BOIL_SET_DELETE_ACTION,
    payload: boiler,
  };
};
export const unsetAction = () => {
  return {
    type: BOIL_UNSET_ACTION,
  };
};

export const getBoilersAsync = () => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/calderas`
    );
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
