import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.modedl.js";
import {faker, simpleFaker} from '@faker-js/faker'
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
        console.error(error); // Ensure `console.error
        process.exit(1);
    }
}

export const createSampleChat =async (numChats)=>{

    try {
        const users = await User.find().select("_id");
    
        const chatPromises =[];
    
      for(i=0;i<users.length;i++){
        for(j=i+1;j<users.length;j++){
            chatPromises.push(
                Chat.create({
                    name:faker.lorem.word(2),
                    members:[users[i],users[j]],
                })
            )
        }
      }
    
      await Promise.all(chatPromises);
      console.log("chats created",numChats);
      process.exit()
      
    } catch (error) {
        console.log(error.message)
    }

}

export const createGroupChat = async (numChats)=>{
    try {
        const users = await User.find().select("_id");
    
        const chatPromises =[];
    
      for(i=0;i<users.length;i++){
        const numsMembers = simpleFaker.number.int({min:3,max:users.length});
      }const membbers = [];


       for(let i=0;i<numsMembers.length;i++){
     const reandomIndex = Math.flooe(Math.random() * users.length)   
    const randomUser = users[reandomIndex];

    if(!members.includes(randomUser)){
        members.push(randomUser);
    }
    }

    const chat = Chat.create({
        groupChat:true,
        name:faker.lorem.word(2),
        members:members,
        creator:members[0]

    })

        
    } catch (error) {
        console.log(error)
    }
}

export const createMessage = async (numMessages)=>{
    try {
        const users = await User.find().select("_id");
        const chats = await Chat.find().select("_id");
        
       const messagePromise = [];

       for(let i=0;i<numMessages;i++){
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomChat = chats[Math.floor(Math.random() * chats.length)];
       }

       messagePromise.push(
        Message.create({
            chat:randomChat,
            sender:randomUser,
            content:faker.lorem.sentence(10),
        })
       )


  await Promise.all(messagePromise)
  console.log("messages created",numMessages);
  process.exit()
    } catch (error) {
        console.log(error)
    }
}