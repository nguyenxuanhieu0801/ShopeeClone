import { SuccessResponse, User } from '~/types';
import axiosClient from '~/utils/axiosClient';

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string;
  newPassword?: string;
}

const userApi = {
  getProfile() {
    return axiosClient.get<SuccessResponse<User>>('me');
  },
  updateProfile(body: BodyUpdateProfile) {
    return axiosClient.put<SuccessResponse<User>>('user', body);
  },
  uploadAvatar(body: FormData) {
    return axiosClient.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default userApi;
