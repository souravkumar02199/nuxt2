import axios from "axios";
import { URL } from "@/api/global.env";

const apiDefaults = {
    baseURL: `${URL}/api`,
    timeout: 10000,
};

const unauthClient = axios.create({
  baseURL: `${URL}/api/accounts`,
  timeout: 10000,
});


export { unauthClient, apiDefaults, axios };
