import axios from 'axios';
import {
  CREATE_BUILDINGS,
  UPDATE_BUILDINGS,
  DELETE_BUILDINGS,
  SET_ALL_BUILDINGS,
  SET_ERROR,
  SET_LOADING_TRUE,
} from '../types/buildingsTypes';

export const createBuilding = (building) => {
  return {
    type: CREATE_BUILDINGS,
    payload: building,
  };
};
export const updateBuilding = (building) => {
  return {
    type: UPDATE_BUILDINGS,
    payload: building,
  };
};
export const deleteBuilding = (buildingId) => {
  return {
    type: DELETE_BUILDINGS,
    payload: buildingId,
  };
};
export const setBuildings = (buildings) => {
  return {
    type: SET_ALL_BUILDINGS,
    payload: buildings,
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
export const getBuildingsAsync = () => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.get('http://localhost:8090/edificios');
    if (res.status === 200) {
      let buildings = [];
      for (let i = 0; i < res.data.length; i++) {
        buildings.push(buildingMapperToEnglish(res.data[i]));
      }
      dispatch(setBuildings(buildings));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deleteBuildingsAsync = (buildingId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/edificios/${buildingId}`
    );
    if (res.status === 200) {
      dispatch(deleteBuilding(buildingId));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createBuildingAsync = (building) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const espBuilding = buildingMapperToSpanish(building);
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/edificios`,
      espBuilding
    );
    if (res.status === 201) {
      return dispatch(createBuilding(buildingMapperToEnglish(res.data)));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
export const updateBuildingAsync = (building) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const espBuilding = buildingMapperToSpanish(building);
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/edificios/${building.id}`,
      espBuilding
    );
    if (res.status === 200) {
      return dispatch(updateBuilding(buildingMapperToEnglish(res.data)));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
const buildingMapperToEnglish = (spanishBuild) => {
  return {
    id: spanishBuild._id,
    direction: spanishBuild.direccion,
    city: spanishBuild.ciudad,
    name: spanishBuild.nombre,
    postalCode: spanishBuild.codigoPostal,
    isParticular: spanishBuild.esParticular,
    constructionCompanyId: spanishBuild.constructoraId,
  };
};
const buildingMapperToSpanish = (englishBuild) => {
  return {
    _id: englishBuild.id,
    direccion: englishBuild.direction,
    ciudad: englishBuild.city,
    nombre: englishBuild.name,
    codigoPostal: englishBuild.postalCode,
    esParticular: englishBuild.isParticular,
    constructoraId: englishBuild.constructionCompanyId,
  };
};
