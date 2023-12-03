class DataService{
    constructor(){

    }

    postAxiosData(url, data){
        axios
        .post(url, data)
        .then((response)=> {
            console.log("RESP", response);
            location.reload();
        })
          .catch((error)=> {
            console.log("hiba",error);
          })
        
    }

}

export default DataService