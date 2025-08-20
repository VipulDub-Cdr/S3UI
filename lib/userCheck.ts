import {userModel} from "@/lib/db"

export async function checkuser(userid: string){
    const isthere = await userModel.findOne({userid})
    return isthere;
}