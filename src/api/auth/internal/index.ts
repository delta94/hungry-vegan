import { publicApi, ResponseStatus, DataResponse } from 'api';

type LoginResponse = DataResponse<string>;

export const loginWithCredentials = async (loginFormData): Promise<LoginResponse> => {
    try {
        const { data } = await publicApi.post('/login', loginFormData);
        return { status: ResponseStatus.success, data: data.token };
    } catch (error) {
        return { status: ResponseStatus.error, data: null };
    }
};

export const register = async (registerFormData): Promise<LoginResponse> => {
    try {
        const { data } = await publicApi.post('/register', registerFormData);
        return { status: ResponseStatus.success, data: data.token };
    } catch (error) {
        return { status: ResponseStatus.error, data: null };
    }
};
