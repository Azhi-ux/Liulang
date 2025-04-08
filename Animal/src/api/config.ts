interface EnvConfig {
  apiBaseUrl: string;
  useMock: boolean;
}

// 获取环境配置
export const getEnvConfig = (): EnvConfig => {
  // 开发环境使用mock数据
  const isDev = import.meta.env.MODE === 'development';
  
  return {
    apiBaseUrl: isDev ? '/api' : 'https://api.example.com',
    useMock: isDev
  };
}; 