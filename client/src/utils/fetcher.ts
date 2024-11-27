import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const fetcher = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unexpected error occurred.");
  }
};

export default fetcher;
