import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt" 
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema({
    username:{
        type: String,
        required : true,
        unique: true,
        lowercase : true,
        trim : true,
        index : true 
    },
    email:{
        type: String,
        required : true,
        unique: true,
        lowercase : true,
        trim : true,
      },
      contact :{
        type: Number, 
    required: true
      },
      password:{
        type: String,
        required : true
       
      },  
     walletId:{
        type : String,
        trim: true,
        unique: true,
        immutable: true,

    },
    balance:{
       type : Number,
       default :0.5
    },
    event_joined :[{
          type : Schema.Types.ObjectId,
          ref : "Event"
      }],
     
      refreshToken:{   
        type : String,
      }

},
{timestamps : true}
)

userSchema.pre("save",async function (next) {
    
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)

    if (!this.walletId) {
      this.walletId = crypto.randomBytes(6).toString("hex"); // Generates a 12-character ID
    }

    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    console.log("Hashed password: ",this.password);

    return await bcrypt.compare(password,this.password)
}

function generateToken(payload,secret,expiresIn){
    return jwt.sign(payload,secret,{expiresIn})
}

userSchema.methods.generateAccessToken =function(){
    const payload={
        _id : this._id,
        email : this.email,
        username : this.username,
    };

    const token = generateToken(payload,process.env.ACCESS_TOKEN_SECRET,'2d');

    if (!token){
       
    }

    return token;
}

userSchema.methods.generateRefreshToken = function (){
    const payload = {
        _id: this._id,  // User ID
      };

      const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30d'  // Set expiration for refresh token
      });

    if (!token) {
        throw new ApiError(404, "Token is not generating");
      }
    
      return token;

}

export const User = mongoose.model("User",userSchema)