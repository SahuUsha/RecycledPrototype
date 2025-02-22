import mongoose ,{Schema} from "mongoose"

const voteSchema = new Schema(
    {
        event :{
            type : Schema.Types.ObjectId,
            ref : "Event"

        },
        voteBy:{
            type : Schema.Types.ObjectId,
            ref : "User"
        }

    }
    ,{timestamps:true})

    export const Vote= mongoose.model("Vote",voteSchema)