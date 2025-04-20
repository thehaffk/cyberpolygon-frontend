import { FEATURES } from '../config/env';

/**
 * Mock data repository
 */
const mockData = {
  auth: {
    me: {
      id: 1,
      username: "student",
      email: "student@example.com",
      firstName: "Иван",
      lastName: "Смирнов",
      role: "student"
    },
    oauthUrls: {
      google: "https://accounts.google.com/o/oauth2/v2/auth?mock=true",
      github: "https://github.com/login/oauth/authorize?mock=true",
      yandex: "https://oauth.yandex.ru/authorize?mock=true"
    }
  },
  tasks: [
    {
      id: 1,
      title: "Основы веб-безопасности",
      description: "Исследование уязвимостей веб-приложений и методов защиты",
      difficulty: "Легкий",
      category: "Web",
      completedCount: 234
    },
    {
      id: 2,
      title: "Сетевые атаки",
      description: "Анализ и защита от распространенных сетевых угроз",
      difficulty: "Средний",
      category: "Network",
      completedCount: 156
    },
    {
      id: 3,
      title: "Анализ вредоносного ПО",
      description: "Техники обратной разработки и анализа вредоносного кода",
      difficulty: "Сложный",
      category: "Malware",
      completedCount: 78
    }
  ],
  rubrics: [
    {
      id: 1,
      name: "network-security",
      title: "Сетевая безопасность",
      description: "Защита сетевой инфраструктуры и предотвращение атак",
      color: "#4287f5",
      articles_count: 5
    },
    {
      id: 2,
      name: "crypto",
      title: "Криптография",
      description: "Методы шифрования и защиты информации",
      color: "#f54242",
      articles_count: 3
    },
    {
      id: 3,
      name: "web-security",
      title: "Веб-безопасность",
      description: "Защита веб-приложений от уязвимостей и атак",
      color: "#42f582",
      articles_count: 7
    }
  ],
  articles: [
    {
      id: 1,
      title: "Основы сетевой безопасности",
      content: "Это статья про основы сетевой безопасности...",
      rubric: 1,
      rubric_name: "network-security",
      created_at: "2023-10-15T10:00:00Z",
      updated_at: "2023-10-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Введение в криптографию",
      content: "Это статья про основы криптографии...",
      rubric: 2,
      rubric_name: "crypto",
      created_at: "2023-09-20T14:30:00Z",
      updated_at: "2023-09-20T14:30:00Z"
    },
    {
      id: 3,
      title: "XSS-атаки в современных веб-приложениях",
      content: "Это статья про XSS-атаки...",
      rubric: 3,
      rubric_name: "web-security",
      created_at: "2023-11-05T09:15:00Z",
      updated_at: "2023-11-05T09:15:00Z"
    }
  ],
  courses: [
    {
      id: 1,
      title: "Введение в кибербезопасность",
      description: "Фундаментальные принципы и основы кибербезопасности",
      duration: "4 недели",
      level: "Начальный",
      enrolledCount: 1256
    },
    {
      id: 2,
      title: "Защита веб-приложений",
      description: "Современные методы защиты от OWASP Top 10 уязвимостей",
      duration: "6 недель",
      level: "Средний",
      enrolledCount: 842
    },
    {
      id: 3,
      title: "Расследование инцидентов",
      description: "Методология и инструменты расследования инцидентов ИБ",
      duration: "8 недель",
      level: "Продвинутый",
      enrolledCount: 513
    }
  ],
  tests: [
    {
      id: 1,
      title: "Основы сетевой безопасности",
      description: "Проверка знаний по базовым концепциям сетевой безопасности",
      questionCount: 20,
      timeLimit: 30,
      completedCount: 342
    },
    {
      id: 2,
      title: "Уязвимости веб-приложений",
      description: "Тест на знание OWASP Top 10 и методов защиты",
      questionCount: 15,
      timeLimit: 25,
      completedCount: 285
    }
  ],
  profile: {
    completedTasks: 5,
    completedCourses: 1,
    points: 1250,
    badges: ["Новичок", "Исследователь"],
    rank: 42
  }
};

/**
 * Simulates API latency with random delay
 */
const delay = (data) => {
  const ms = Math.floor(Math.random() * 600) + 200; // Random delay between 200-800ms
  return new Promise(resolve => {
    setTimeout(() => resolve(data), ms);
  });
};

/**
 * Mock service implementation that mimics API behavior
 */
export const mockService = {
  auth: {
    login: (email, password) => {
      return delay({
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
        user: mockData.auth.me
      });
    },
    
    register: (username, email, password) => {
      return delay({
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
        user: { ...mockData.auth.me, username, email }
      });
    },
    
    getOAuthUrl: (provider) => {
      return delay(mockData.auth.oauthUrls[provider] || '');
    },
    
    handleOAuthCallback: () => {
      return delay({
        access: 'mock-auth-token-' + Date.now(),
        refresh: 'mock-refresh-token',
        user: mockData.auth.me
      });
    },
    
    getCurrentUser: () => {
      return delay(mockData.auth.me);
    },
    
    updateProfile: (data) => {
      return delay({ ...mockData.auth.me, ...data });
    },
    
    changePassword: () => {
      return delay({ success: true });
    },
    
    logout: () => {
      return delay({ success: true });
    }
  },
  
  rubrics: {
    getAll: () => {
      return delay(mockData.rubrics);
    },
    
    getById: (id) => {
      const rubric = mockData.rubrics.find(r => r.id === id);
      if (rubric) {
        return delay(rubric);
      }
      return Promise.reject(new Error('Rubric not found'));
    },
    
    getByName: (name) => {
      const rubric = mockData.rubrics.find(r => r.name === name);
      if (rubric) {
        return delay(rubric);
      }
      return Promise.reject(new Error('Rubric not found'));
    }
  },
  
  articles: {
    getAll: (rubricId = null) => {
      const articles = rubricId 
        ? mockData.articles.filter(a => a.rubric === rubricId)
        : mockData.articles;
      return delay(articles);
    },
    
    getById: (id) => {
      const article = mockData.articles.find(a => a.id === id);
      if (article) {
        return delay(article);
      }
      return Promise.reject(new Error('Article not found'));
    },
    
    getByRubric: (rubricName) => {
      const articles = mockData.articles.filter(a => a.rubric_name === rubricName);
      return delay(articles);
    },
    
    getPopular: (limit) => {
      return delay(mockData.articles.slice(0, limit));
    }
  },
  
  tasks: {
    getAll: () => {
      return delay(mockData.tasks);
    },
    
    getById: (id) => {
      const task = mockData.tasks.find(t => t.id === id);
      if (task) {
        return delay(task);
      }
      return Promise.reject(new Error('Task not found'));
    }
  },
  
  courses: {
    getAll: () => {
      return delay(mockData.courses);
    },
    
    getById: (id) => {
      const course = mockData.courses.find(c => c.id === id);
      if (course) {
        return delay(course);
      }
      return Promise.reject(new Error('Course not found'));
    }
  },
  
  tests: {
    getAll: () => {
      return delay(mockData.tests);
    },
    
    getById: (id) => {
      const test = mockData.tests.find(t => t.id === id);
      if (test) {
        return delay(test);
      }
      return Promise.reject(new Error('Test not found'));
    }
  },
  
  profile: {
    getProgress: () => {
      return delay(mockData.profile);
    }
  }
};

/**
 * Check if mock mode is enabled
 */
export const shouldUseMocks = () => {
  return FEATURES.USE_MOCKS;
};

export default mockService;