import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
  Firstname: {
      type: String
    },
    LastName:{
      type:String
    },
    Email:{
      type:String
    },
    Password:{
      type:String
    },

  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
