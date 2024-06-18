import { User } from "../models/user.modedl.js";
import {faker} from '@faker-js/faker'
export const  createUser = async (numUsers)=>{
    try {
        const usersPromise =[];

    for(let i=0; i<numUsers; i++) {
        const tempUser = await  User.create({
            name:faker.person.fullName(),
            username:faker.internet.userName(),
            password:"password",
            avatar:{
                url:faker.image.avatar(),
                public_id:faker.system.fileName()
            },
            bio:faker.lorem.sentence(10)
        })
        usersPromise.push(tempUser);
    }

    await Promise.all(usersPromise);
    console.log("users created",numUsers);


    } catch (error) {
        console.error(error);
        process.exit(1);
        
    }
}