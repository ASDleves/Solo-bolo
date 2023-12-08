class PublicDataService {
  constructor() {

  }

  getPublicAxiosData(url, id, callback, hibacallback) {
    axios.get(`${url}/${id}`)
      .then(function (response) {
        /*  console.log("Válasz objektum",response); */
        //console.log("adatok",response.data);
        //console.log("státusz",response.status);
        //console.log("Státusz szöveg",response.statusText);
        /*           console.log("Válasz fejléc",response.headers);
                  console.log("Válasz config",response.config); */
        callback(response.data)

      })
      .catch(function (error) {
        hibacallback(error)
      })
      .finally(function () {
        // always executed
      });
  }
  getPublicnevAxiosData(url, nev, callback, hibacallback) {
    axios.get(`${url}/${nev}`)
      .then(function (response) {
        /*  console.log("Válasz objektum",response); */
        //console.log("adatok",response.data);
        //console.log("státusz",response.status);
        //console.log("Státusz szöveg",response.statusText);
        /*           console.log("Válasz fejléc",response.headers);
                console.log("Válasz config",response.config); */
        callback(response.data)

      })
      .catch(function (error) {
        hibacallback(error)
      })
      .finally(function () {
        // always executed
      });
  }
  getAxiosData(url, callback, hibacallback) {
    axios.get(url)
      .then(function (response) {
        /*  console.log("Válasz objektum",response); */
        console.log("adatok", response.data);
        console.log("státusz", response.status);
        console.log("Státusz szöveg", response.statusText);
        /*           console.log("Válasz fejléc",response.headers);
                console.log("Válasz config",response.config); */
        callback(response.data)

      })
      .catch(function (error) {
        hibacallback(error)
      })
      .finally(function () {
        // always executed
      });
  }

  getUserIdByName(url, name, callback, errorCallback) {
        axios.get(`${url}/user-id/${name}`)
            .then(response => callback(response.data))
            .catch(error => errorCallback(error));
    }
    getPontByUserIdAndSeason(url, userId, season, callback, errorCallback) {
      axios.get(`${url}/ponts/${userId}/${season}`)
          .then(response => callback(response.data))
          .catch(error => errorCallback(error));
  }
    updatePontByUserIdAndSeason(url, userId, season, newPont, callback, errorCallback) {
      axios.put(`${url}/ponts/update/${userId}/${season}`, { pont: newPont })
          .then(response => callback(response.data))
          .catch(error => errorCallback(error));
  }
  updateOsszesTippByUserIdAndSeason(url, userId, season, newOsszesTipp, callback, errorCallback) {
    axios.put(`${url}/ponts/update/osszes-tipp/${userId}/${season}`, { Osszes_Tipp: newOsszesTipp })
      .then(response => callback(response.data))
      .catch(error => errorCallback(error));
  }

  // Update OneShot by User ID and Season
  updateOneShotByUserIdAndSeason(url, userId, season, newOneShot, callback, errorCallback) {
    axios.put(`${url}/ponts/update/one-shot/${userId}/${season}`, { OneShot: newOneShot })
      .then(response => callback(response.data))
      .catch(error => errorCallback(error));
  }

}


export default PublicDataService