import { boolean } from '@hapi/joi';
import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    archive: {
      type: Boolean,
      default: false
    },
    trash: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);
