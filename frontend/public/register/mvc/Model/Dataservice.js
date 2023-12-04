class DataService {
  postAxiosData(url, data) {
      // Assuming you are using Axios, it returns a Promise by default.
      return axios.post(url, data);
  }
}
export default DataService;