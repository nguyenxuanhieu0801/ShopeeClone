import { Product, ProductList, ProductListConfig, SuccessResponse } from '~/types';
import axiosClient from '~/utils/axiosClient';

const URL = 'products';
const productApi = {
  getProducts(params: ProductListConfig) {
    return axiosClient.get<SuccessResponse<ProductList>>(URL, {
      params
    });
  },
  getProductDetail(id: string) {
    return axiosClient.get<SuccessResponse<Product>>(`${URL}/${id}`);
  }
};

export default productApi;
