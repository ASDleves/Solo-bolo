class PublicDataService{
    constructor(){

    }

    getPublicAxiosData(url,id, callback, hibacallback){
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
    

}

export default PublicDataService