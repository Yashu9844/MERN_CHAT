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

export const createSampleChat = async (numChats)=>{

    try {
        const users = await User.find().select("_id");
    
        const chatPromises =[];
    
      for(let i=0;i<users.length;i++){
        for(let j=i+1;j<users.length;j++){
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

export const createGroupChat = async (numChats) => {
    try {
        const users = await User.find().select("_id");
    
        const chatPromises = [];
    
        for (let i = 0; i < numChats; i++) {
            const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
            const members = [];
    
            while (members.length < numMembers) {
                const randomIndex = Math.floor(Math.random() * users.length);
                const randomUser = users[randomIndex];
    
                if (!members.includes(randomUser)) {
                    members.push(randomUser);
                }
            }
    
            const chat = Chat.create({
                groupChat: true,
                name: faker.lorem.words(2),
                members: members,
                creator: members[0]
            });
    
            chatPromises.push(chat);
        }
    
        await Promise.all(chatPromises);
        process.exit();
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export const createMessage = async (numMessages) => {
    try {
        const users = await User.find().select("_id");
        const chats = await Chat.find().select("_id");

        const messagePromises = [];

        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomChat = chats[Math.floor(Math.random() * chats.length)];

            messagePromises.push(
                Message.create({
                    chat: randomChat._id,
                    sender: randomUser._id,
                    content: faker.lorem.sentence(10),
                })
            );
        }

        await Promise.all(messagePromises);
        console.log("Messages created:", numMessages);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};
export const createMessageInChat = async (chatId, numMessages) => {
    try {
        const users = await User.find().select("_id");

        const messagePromises = [];

        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];

            messagePromises.push(
                Message.create({
                    chat: chatId,
                    sender: randomUser._id,
                    content: faker.lorem.sentence(),
                })
            );
        }

        await Promise.all(messagePromises);
        console.log("Messages created in chat:", chatId);
        process.exit();
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


