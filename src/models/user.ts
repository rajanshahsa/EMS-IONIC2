export class User {
    email = "";
    username = "";
    sex = "";
    dob = "";
    mobileNo = "";
    userId = "";
     constructor(public userData : any){
        this.username = userData["username"]
        this.email =  userData["emailId"]
        this.sex = userData["sex"]
        this.dob =  userData["dob"]
        this.mobileNo = userData["mobileNo"]
        this.userId = userData["userId"]
    }
}