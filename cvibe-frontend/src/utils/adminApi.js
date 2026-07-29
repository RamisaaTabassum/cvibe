
import API from './api';

export const getAdminStats = () => API.get('/admin/stats');
export const getAdminUsers = () => API.get('/admin/users');
export const getAdminCVs = () => API.get('/admin/cvs');
export const deleteAdminUser = (id) => API.delete(`/admin/users/${id}`);