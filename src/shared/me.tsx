import { AxiosResponse } from "axios";
import { http } from "./Http";

export let mePromise: Promise<AxiosResponse<{
    resource: {
      id: number;
    };
  }>> | undefined

export const refreshMe = () => {
    console.log('refresh');
    mePromise = http.get<{ resource: { id: number } }>('/me')
    return mePromise
}

export const fetchMe = refreshMe