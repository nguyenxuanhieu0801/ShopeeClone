import { Purchase, PurchaseListStatus, SuccessResponse } from '~/types';
import axiosClient from '~/utils/axiosClient';

const URL = 'purchases';

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return axiosClient.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body);
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return axiosClient.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params
    });
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return axiosClient.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body);
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return axiosClient.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body);
  },
  deletePurchase(purchaseIds: string[]) {
    return axiosClient.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    });
  }
};

export default purchaseApi;
