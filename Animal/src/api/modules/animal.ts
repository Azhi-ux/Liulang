import { AxiosInstance } from 'axios';
import { getEnvConfig } from '../config';
import { animalMockData, Animal } from '../mock/animal';

// 动物相关接口
export default function(axios: AxiosInstance) {
  const { useMock } = getEnvConfig();

  return {
    // 获取动物列表
    getAnimalList: (params: any) => {
      if (useMock) return Promise.resolve({
        total: animalMockData.animalList.length,
        list: animalMockData.animalList
      });
      return axios.get('/animals', { params });
    },

    // 获取动物详情
    getAnimalDetail: (id: number) => {
      if (useMock) {
        const animal = animalMockData.animalList.find((item: Animal) => item.id === id);
        return Promise.resolve(animal);
      }
      return axios.get(`/animals/${id}`);
    },

    // 搜索动物
    searchAnimals: (keyword: string) => {
      if (useMock) {
        const filteredAnimals = animalMockData.animalList.filter((animal: Animal) => 
          animal.name.includes(keyword) || 
          animal.type.includes(keyword) || 
          animal.description.includes(keyword)
        );
        return Promise.resolve({
          total: filteredAnimals.length,
          list: filteredAnimals
        });
      }
      return axios.get('/animals/search', { params: { keyword } });
    },

    // 按类型获取动物
    getAnimalsByType: (type: string) => {
      if (useMock) {
        const filteredAnimals = animalMockData.animalList.filter((animal: Animal) => animal.type === type);
        return Promise.resolve({
          total: filteredAnimals.length,
          list: filteredAnimals
        });
      }
      return axios.get('/animals/type', { params: { type } });
    },

    // 获取动物类型列表
    getAnimalTypes: () => {
      if (useMock) return Promise.resolve(animalMockData.animalTypes);
      return axios.get('/animals/types');
    }
  };
} 