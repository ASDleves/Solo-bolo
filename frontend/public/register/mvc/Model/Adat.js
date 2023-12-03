export const urlapleiro ={
    name:{
        megj:"name",
        type:"text",
        placeholder:"",
        value:"",
        regex:"[A-Z][a-z]{2,15}",
        valid:"Nagybetűvel kezdődik, legalább 3 betű legyen!"
    },
    email: {
        megj: "email",
        type: "email",
        placeholder: "",
        value: "",
        regex:"[A-Z][a-z]+@[a-zA-Z\d]+\.[a-zA-Z]{2,15}",
        valid:"Példa: Abc@example.com"
    },
    
    password: {
        megj: "password",
        type: "password",
        placeholder: "",
        value: "",
        regex:"[A-Z][a-z].*\d.{8,40}",
        valid:"Példa: Ab!cdefg9hijk!"
    },
}