class DataService{
    constructor(){

    }

    getAxiosData(url, callback, hibacallback){
        axios.get(url)
        .then(function (response) {
          console.log("adatok",response.data);
          console.log("státusz",response.status);
          console.log("Státusz szöveg",response.statusText);
          callback(response.data)
          
        })
        .catch(function (error) {
          hibacallback(error)
        })
        .finally(function () {
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