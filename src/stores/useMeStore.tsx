import { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { http } from "../shared/Http";

type meState = { 
    me: Resource<User> | undefined,
    mePromise:  Promise<AxiosResponse<Resource<User>, any>>| undefined
}

type meAction = {
    refreshMe: () => void,
    fetchMe: () => void
}

export const useMeStore = defineStore<string, meState,{}, meAction>("meStore", {
  state: () => ({
    mePromise:  undefined,
    me: undefined,
  }),
  actions: {
    refreshMe() {
      this.mePromise = http.get<Resource<User>>("/me");
    },
    fetchMe() {
      this.refreshMe()
    },
  },
});
