import {userModel} from "@/lib/db"

export async function checkuser(userid: String){
    let isthere = await userModel.findOne({userid})
    return isthere;
}