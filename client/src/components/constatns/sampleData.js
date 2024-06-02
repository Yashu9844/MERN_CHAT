export const sampleChats = [{
    avatar:[ 'https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar.png'],
    name:"yashwanth",
    _id:"1",
    groupChat:false,
    members:["1","2","3"]
},
{
    avatar:[ 'https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar.png'],
    name:"shambu",
    _id:"2",
    groupChat:false,
    members:["1","2"]
},

]

export const sampleUsers = [{
    avatar:[ 'https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar.png'],
    name:"yashwanth",
    _id:"1",
    
},
{
    avatar:[ 'https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar.png'],
    name:"shambu",
    _id:"2",
},
{
    avatar:[ 'https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar.png'],
    name:"Hello",
    _id:"3",
}]

export const sampleNotification = [  { sender:{
    avatar:[ 'https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar.png'],
    name:"shambu",
},
 _id:'5'
},
{
sender:{
    avatar:[ 'https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar.png'],
    name:"shambu",
},
 _id:'6'
},
{
    sender:{
        avatar:[ 'https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar.png'],
        name:"asdnjkln",
    },
     _id:'7'
    }]


    export const sampleMessage= [{
        attachment:[
            {
                public_id:"123",
                url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser-picture_21104&psig=AOvVaw08-DTYRfCflNEpMBhSC-nf&ust=1716663892137000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNChz7f-poYDFQAAAAAdAAAAABAE"
            }
        ],
        content:"NAMNDE MESASAGE IDHU",
        _id:"super",
        sender:{
            _id:"user._id",
            name:"Yashwanth",
        },
        chat:"ChatId",
        createAt:"2024-02-12"
    },{
        attachment:[
            {
                public_id:"12333",
                url:"https://unsplash.com/photos/a-satellite-image-of-a-large-body-of-water-eAGoXRFiysw"
            }
        ],
        content:"NAMdalla MESASAGE IDHU",
        _id:"super1",
        sender:{
            _id:"asgdhbjwebrukhhgba",
            name:"Yashwanthee",
        },
        chat:"ChatId",
        createAt:"2024-02-12"
    }]

    export const dashboardData = {
        users: [
          {
            name: "Yashwanth",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "1",
            username: "yashu",
            friends: 20,
            groups: 5,
          },
          {
            name: "Shambu",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "2",
            username: "shambu",
            friends: 20,
            groups: 25,
          }
        ],
        chats: [
          {
            name: "Group Chat 1",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "1",
            groupChat: false,
            members: [
              {
                _id: "1",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
              },
              {
                _id: "2",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
              }
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
              name: "Yashwanth",
              avatar: "https://www.w3schools.com/howto/img_avatar.png"
            }
          },
          {
            name: "Group Chat 2",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "2",
            groupChat: false,
            members: [
              {
                _id: "1",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
              },
              {
                _id: "2",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
              }
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
              name: "Shambu",
              avatar: "https://www.w3schools.com/howto/img_avatar.png"
            }
          }
        ]
      };
      