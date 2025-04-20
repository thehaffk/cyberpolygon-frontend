import axiosInstance from './axiosInstance';

const COURSES_URL = '/cyberpolygon/v1/courses';

export const getCourses = async () => {
  const response = await axiosInstance.get(`${COURSES_URL}/`);
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await axiosInstance.get(`${COURSES_URL}/${id}/`);
  return response.data;
};

export const getLessons = async (courseId) => {
  const response = await axiosInstance.get(`${COURSES_URL}/${courseId}/lessons/`);
  return response.data;
};

export const getLessonById = async (courseId, lessonId) => {
  const response = await axiosInstance.get(`${COURSES_URL}/${courseId}/lessons/${lessonId}/`);
  return response.data;
};

export const getCourseBySlug = async (slug) => {
  const response = await axiosInstance.get(`${COURSES_URL}/${slug}/`);
  return response.data;
};

export const getLessonContent = async (courseSlug, lessonSlug) => {
  const response = await axiosInstance.get(`${COURSES_URL}/${courseSlug}/lessons/${lessonSlug}/`);
  return response.data;
};

export const completeLesson = async (courseSlug, lessonSlug) => {
  const response = await axiosInstance.post(`${COURSES_URL}/${courseSlug}/lessons/${lessonSlug}/complete/`);
  return response.data;
};

export const getCourseProgress = async (courseSlug) => {
  const response = await axiosInstance.get(`${COURSES_URL}/${courseSlug}/progress/`);
  return response.data;
};

const coursesApi = {
  // Получение списка всех курсов
  list: async (category, page, size) => {
    let url = `${COURSES_URL}/`;
    const params = {};
    
    if (category) params.category = category;
    if (page) params.page = page;
    if (size) params.size = size;
    
    const response = await axiosInstance.get(url, { params });
    return response.data;
  },
  
  // Получение детальной информации о курсе по slug
  get: async (slug) => {
    const response = await axiosInstance.get(`${COURSES_URL}/${slug}/`);
    return response.data;
  },
  
  // Создание нового курса (требуются права)
  create: async (courseData) => {
    const response = await axiosInstance.post(`${COURSES_URL}/`, courseData);
    return response.data;
  }
};

export default coursesApi; 