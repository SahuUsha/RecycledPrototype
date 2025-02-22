import mongoose, { Schema, Types } from "mongoose";

const eventSchema = new Schema(
    {

    title:{
        type: String,
        required : true,
     
        trim : true,
        index : true 
    },
    description : {
        type: String,
        required : true,
        trim : true,
    },
    location : {
        type: String,
        required : true,
        trim : true,
    },
    image:{
        data: Buffer,
        contentType: String 
      },
    owner : {
        type :Schema.Types.ObjectId,
        ref : "User"
    },
    isEventComplete: {
       type : Boolean,
       default : false
    },
    
    participants : [
        {
            type :  Schema.Types.ObjectId,
            ref : "User"
        }
    ]


},
{timestamps:true})

export const Event= mongoose.model("Event",eventSchema)

