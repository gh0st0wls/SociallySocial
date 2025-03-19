import { Schema, Types, Document, ObjectId } from "mongoose";

interface IReactions extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date|string;
}

const reactionSchema = new Schema<IReactions>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: { type: String, maxlength: 280, required: true },
    username: { type: String, required: true },
    createdAt: { 
      type: Date, 
      default: Date.now,
      get: (timestamp:any) => new Date(timestamp).toLocaleString(),
    },
  },
  {
    toJSON:{
        getters:true,
    },
    id: false,
  }
);

export default reactionSchema;