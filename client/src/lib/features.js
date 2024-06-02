import moment from "moment";

const fileFormat =(url = '')=>{

    const fileExt = url.split(".").pop();

    if(fileExt === 'mp4' || fileExt === 'webm' || fileExt === "ogg")return "video";

    if(fileExt === 'mp3' || fileExt === 'wav')return "audio";

    if(fileExt === 'png' || fileExt === 'jpg '  || fileExt === 'jpeg' || fileExt === 'gif')return "image";
 
    return "file"

}

 const transeformImage = (url = '',width=100)=> url;

const getLast7Days = ()=>{
 const currentDate = moment();

 const lastSevenDays = [];

 for(let i =0;i<7;i++){
    lastSevenDays.unshift(currentDate.format("MMM D"));
    currentDate.subtract(1,"days");
 }
 return lastSevenDays;

}

export {fileFormat,transeformImage,getLast7Days}