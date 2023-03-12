import { Axios } from "./AxiosWithCredentials";

export class FetchsDb {
  static fetchGet = async (path) => {
    try {
      const { data } = await Axios.get(`${path}`);
      return data;
    } catch (err) {
      console.error(err, `failed to get ${path}`);
    }
  };
}

// /guards/byclient/${id}
