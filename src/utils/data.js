import axios from "axios";


export async function getData(URL) {
  let response = await axios.get(`${URL}`);
  return response.data;
}