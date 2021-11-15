import axios from 'axios';
import {
  BUILD_CREATE_BUILDING,
  BUILD_UPDATE_BUILDING,
  BUILD_DELETE_BUILDING,
  BUILD_SET_ALL_BUILDINGS,
  BUILD_SET_ERROR,
  BUILD_SET_LOADING_TRUE,
} from '../types/buildingsTypes';

export const createBuilding = (building) => {
  return {
    type: BUILD_CREATE_BUILDING,
    payload: building,
  };
};
export const updateBuilding = (building) => {
  return {
    type: BUILD_UPDATE_BUILDING,
    payload: building,
  };
};
export const deleteBuilding = (buildingId) => {
  return {
    type: BUILD_DELETE_BUILDING,
    payload: buildingId,
  };
};
export const setBuildings = (buildings) => {
  return {
    type: BUILD_SET_ALL_BUILDINGS,
    payload: buildings,
  };
};
export const setError = (error) => {
  return {
    type: BUILD_SET_ERROR,
    payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
    type: BUILD_SET_LOADING_TRUE,
  };
};
export const getBuildingsAsync = () => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/edificios`
    );
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
