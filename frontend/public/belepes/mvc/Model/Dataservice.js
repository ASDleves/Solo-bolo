class DataService {
  postAxiosData(url, data) {
      return axios.post(url, data);
  }
}

export default DataService;