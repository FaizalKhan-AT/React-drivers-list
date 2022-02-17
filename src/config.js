import axios from "axios";
import { base_url } from "./env";
const axios_instance = axios.create({
  baseURL: base_url,
});

axios_instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default axios_instance;
