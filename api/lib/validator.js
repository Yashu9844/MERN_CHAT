import {body, validationResult,check, param,query} from 'express-validator'
import { errorHandler } from '../utils/error.js';



const registerValidator = ()=>[

    // body(["name","username","password","bio"]).notEmpty()
      body("name","Please enter a name").notEmpty(),
      body("username","Please enter a username").notEmpty(),
      body("bio","Please enter a bio").notEmpty(),
      body("password","Please enter a password").notEmpty(),
     check("avatar").notEmpty().withMessage('Please upload Avatar')

    ]

export const validateHandler = (req,res,next) =>{

    const errors = validationResult(req);

    const errorMessages = errors.array().map((error)=>error.msg).join(",");

  

    if(errors.isEmpty()) return next();
    else next(errorHandler(400,errorMessages))
}


export const loginValidator = ()=>[

    // body(["name","username","password","bio"]).notEmpty()
      
      body("username","Please enter a username").notEmpty(),
      
      body("password","Please enter a password").notEmpty(),
]


export const newGroupChatValidator = ()=>[
    body("name","Please enter a name").notEmpty(),
    body("members").notEmpty().withMessage('Please provide members').isArray({min:2,max:100}).withMessage('Members must be between 2 and 100 ')
]


export const addMemberValidator = ()=>[
    body("chatId","Please enter a chatId").notEmpty(),
    body("members").notEmpty().withMessage('Please provide members').isArray({min:1,max:97}).withMessage('Members must be between 1 and 97 ')
]


export const removeMembersValidator = ()=>[
    body("chatId","Please enter a chatId").notEmpty(),
    body("userId","Please enter a userId").notEmpty(),
]
export const leaveGroupValidator = ()=>[
    param("id","Please enter a Chat ID").notEmpty(),
   
]
export const sendAttachmentValidator = ()=>[
    body("chatId","Please enter a chatId").notEmpty(),
    check("files").notEmpty().withMessage('Please upload Attachments').isArray({min:1,max:5}).withMessage('Members must be between 1 and 5 ')
]

export const getMessagesValidator = ()=>[
    param("id","Please enter a Chat ID").notEmpty(),
    // query('page').notEmpty()
   
]
export const getChatDetailsValidator = ()=>[
    param("id","Please enter a Chat ID").notEmpty(),
    // query('page').notEmpty()
   
]



export {registerValidator,}