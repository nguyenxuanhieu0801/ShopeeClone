import { Category, SuccessResponse } from '~/types';
import axiosClient from '~/utils/axiosClient';

const URL = 'categories';

const categoryApi = {
  getCategories() {
    return axiosClient.get<SuccessResponse<Category[]>>(URL);
  }
};

export default categoryApi;
