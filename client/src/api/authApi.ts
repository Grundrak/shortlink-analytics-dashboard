import axiosInstance from "./axiosInstance";
import { handleApiError } from "../utils/apiError";
import { User } from "../types";
import { API_CONFIG } from '../config/api.config';

interface AuthResponse {
    user: User;
    token: string;
}
interface LoginCredentials {    
    email: string;
    password: string;
}
interface RegisterCredentials {  
    name: string;
    email: string;
    password: string;
}
// interface UpdateProfileData {
//     name?: string;
//     email?: string;
//     currentPassword?: string;
//     newPassword?: string;
// }

// interface PasswordResetRequest {
//     email: string;
// }

// interface PasswordResetConfirm {
//     token: string;
//     newPassword: string;
// }

export const authApi = {

    login: async (credentials : LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await axiosInstance.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN,credentials);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },
    register: async (credentials : RegisterCredentials): Promise<AuthResponse> => {
        try {
            const response = await axiosInstance.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER,credentials)
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    }




};