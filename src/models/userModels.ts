import { ObjectId, Schema, model, Document } from "mongoose";

interface IUser extends Document{
    username:string;
    email:string;
    thoughts:ObjectId[];
    friends:ObjectId[];
    friendCount: number;
}

const userSchema = new Schema<IUser>({
    username: {type: String, unique:true, required:true, trim:true},
    email: {type:String, required:true, unique:true, match:/\w+@\w+\.\w+/, lowercase:true },
    thoughts: [{type: Schema.Types.ObjectId, ref:'Thoughts' }],
    friends: [{type: Schema.Types.ObjectId, ref:'User' }]
},
{
    toJSON:{
        virtuals:true,
    },
    id: false
})

userSchema.virtual("friendCount").get(function (){
    return this.friends.length || 0;
})
const User = model("User", userSchema);

export default User;