import axios from 'axios';
import {
  CREATE_TECHNICIAN,
  UPDATE_TECHNICIAN,
  DELETE_TECHNICIAN,
  SET_ALL_TECHNICIANS,
  SET_ERROR,
  SET_LOADING_TRUE,
} from '../types/techniciansTypes';

export const createTechnician = (technician) => {
  return {
    type: CREATE_TECHNICIAN,
    payload: technician,
  };
};
export const updateTechnician = (technician) => {
  return {
    type: UPDATE_TECHNICIAN,
    payload: technician,
  };
};
export const deleteTechnician = (technicianId) => {
  return {
    type: DELETE_TECHNICIAN,
    payload: technicianId,
  };
};
export const setTechnicians = (technicians) => {
  return {
    type: SET_ALL_TECHNICIANS,
    payload: technicians,
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
export const getTechniciansAsync = () => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/tecnicos`
    );
    if (res.status === 200) {
      let technicians = [];
      for (let i = 0; i < res.data.length; i++) {
        technicians.push(technicianMapperToEnglish(res.data[i]));
      }
      dispatch(setTechnicians(technicians));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deleteTechniciansAsync = (technicianId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/tecnicos/${technicianId}`
    );
    if (res.status === 200) {
      dispatch(deleteTechnician(technicianId));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createTechnicianAsync = (technician) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const espTechnician = technicianMapperToSpanish(technician);
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/tecnicos`,
      espTechnician
    );
    if (res.status === 201) {
      return dispatch(createTechnician(technicianMapperToEnglish(res.data)));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
export const updateTechnicianAsync = (technician) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const espTechnician = technicianMapperToSpanish(technician);
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/tecnicos/${technician.id}`,
      espTechnician
    );
    if (res.status === 200) {
      return dispatch(updateTechnician(technicianMapperToEnglish(res.data)));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
const technicianMapperToEnglish = (spanishTech) => {
  return {
    id: spanishTech._id,
    name: spanishTech.nombre,
    surname: spanishTech.apellido,
    phone: spanishTech.telefono,
    dni: spanishTech.dni,
    address: spanishTech.direccion,
    specializations: spanishTech.especializaciones,
  };
};
const technicianMapperToSpanish = (englishTech) => {
  return {
    _id: englishTech.id,
    nombre: englishTech.name,
    apellido: englishTech.surname,
    telefono: englishTech.phone,
    dni: englishTech.dni,
    direccion: englishTech.address,
    especializaciones: englishTech.specializations,
  };
};
