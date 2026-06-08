import API from './api';

export const createCV = (data) => API.post('/cv', data);
export const getMyCVs = () => API.get('/cv');
export const getCVById = (id) => API.get(`/cv/${id}`);
export const updateCV = (id, data) => API.put(`/cv/${id}`, data);
export const deleteCV = (id) => API.delete(`/cv/${id}`);