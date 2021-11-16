import axios from 'axios';
import {
  TECH_CREATE_TECHNICIAN,
  TECH_UPDATE_TECHNICIAN,
  TECH_DELETE_TECHNICIAN,
  TECH_SET_ALL_TECHNICIANS,
  TECH_SET_ERROR,
  TECH_SET_LOADING_TRUE,
  TECH_SET_CREATE_ACTION,
  TECH_SET_UPDATE_ACTION,
  TECH_SET_DELETE_ACTION,
  TECH_UNSET_ACTION,
} from '../types/techniciansTypes';

export const createTechnician = (technician) => {
  return {
    type: TECH_CREATE_TECHNICIAN,
    payload: technician,
  };
};
export const updateTechnician = (technician) => {
  return {
    type: TECH_UPDATE_TECHNICIAN,
    payload: technician,
  };
};
export const deleteTechnician = (technicianId) => {
  return {
    type: TECH_DELETE_TECHNICIAN,
    payload: technicianId,
  };
};
export const setTechnicians = (technicians) => {
  return {
    type: TECH_SET_ALL_TECHNICIANS,
    payload: technicians,
  };
};
export const setError = (error) => {
  return {
    type: TECH_SET_ERROR,
    payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
    type: TECH_SET_LOADING_TRUE,
  };
};
export const setCreateAction = () => {
  return {
    type: TECH_SET_CREATE_ACTION,
  };
};
export const setDeleteAction = (technician) => {
  return {
    type: TECH_SET_DELETE_ACTION,
    payload: technician,
  };
};
export const setUpdateAction = (technician) => {
  return {
    type: TECH_SET_UPDATE_ACTION,
    payload: technician,
  };
};
export const unsetAction = () => {
  return {
    type: TECH_UNSET_ACTION,
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
