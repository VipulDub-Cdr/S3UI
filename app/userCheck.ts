import {userModel} from '@/lib/db'
import {S3Client, ListObjectsV2Command} from '@aws-sdk/client-s3'
import {useUser} from '@clerk/nextjs'

const {user} = useUser();
//check karna hai ki database me present hai ki nahi user

const userdata = {
    "userid": user?.id,
    "name": user?.fullName,
} 

export async function checkuser(){
    const isthere = await userModel.findOne({userid: userdata.userid})
    return isthere
}
