class DataService{
    constructor(){

    }

    getAxiosData(url, callback, hibacallback){
        axios.get(url)
        .then(function (response) {
         /*  console.log("Válasz objektum",response); */
          console.log("adatok",response.data);
          console.log("státusz",response.status);
          console.log("Státusz szöveg",response.statusText);
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
    postAxiosData(url, data){
        axios
        .post(url, data)
        .then((response)=> {
            console.log("RESP", response);
        })
          .catch((error)=> {
            console.log("hiba",error);
          })
        
    }
    deleteAxiosData(url, id){
      axios
      .delete(`${url}/${id}`)
      .then((response)=> {
        console.log("RESP", response);
    })
      .catch((error)=> {
        console.log("hiba",error);
      })
    }
    putAxiosData(url, data){
      console.log(data)
      console.log(`${url}/${data.id}`);
      axios
      .put(`${url}/${data.id}`,data)
      .then((response) =>{
        console.log("RESP", response);
      })
      .catch((error)=>{
        console.log("hiba",error);
      })
    }
}

export default DataService