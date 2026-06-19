import API from './api';
export const extractKeywords = (jobDescription) =>
API.post('/ai/keywords', { jobDescription });
export const fixGrammar = (text) =>
 API.post('/ai/grammar', { text });
