class DataService{
    constructor(){

    }

    postAxiosData(url, data){
        axios
        .post(url, data)
        .then((response)=> {
            console.log("feltöltve", response);
        })
          .catch((error)=> {
            console.log("hiba",error);
          })
        
    }

}

export default DataService