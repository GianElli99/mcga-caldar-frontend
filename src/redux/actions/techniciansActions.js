import axios from 'axios';
import {
  CREATE_TECHNICIAN,
  UPDATE_TECHNICIAN,
  DELETE_TECHNICIAN,
  SET_ALL_TECHNICIANS,
  SET_ERROR,
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
export const getTechniciansAsync = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:8090/tecnicos');
    if (res.status === 200) {
      let technicians = [];
      for (let i = 0; i < res.data.length; i++) {
        technicians.push(technicianMapperToEnglish(res.data[i]));
      }
      dispatch(setTechnicians(technicians));
    }
  } catch {
    return;
  }
};
export const deleteTechniciansAsync = (technicianId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:8090/tecnicos/${technicianId}`
    );
    if (res.status === 200) {
      dispatch(deleteTechnician(technicianId));
    }
  } catch (error) {
    dispatch(setError(error.response.data.error));
  }
};
export const createTechnicianAsync = (technician) => async (dispatch) => {
  try {
    const espTechnician = technicianMapperToSpanish(technician);
    const res = await axios.post(
      `http://localhost:8090/tecnicos`,
      espTechnician
    );
    if (res.status === 201) {
      dispatch(createTechnician(technicianMapperToEnglish(res.data)));
    }
  } catch (error) {
    dispatch(setError(error.response.data.error));
  }
};
export const updateTechnicianAsync = (technician) => async (dispatch) => {
  try {
    const espTechnician = technicianMapperToSpanish(technician);
    const res = await axios.put(
      `http://localhost:8090/tecnicos/${technician.id}`,
      espTechnician
    );
    if (res.status === 200) {
      dispatch(updateTechnician(technicianMapperToEnglish(res.data)));
    }
  } catch (error) {
    dispatch(setError(error.response.data.error));
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
