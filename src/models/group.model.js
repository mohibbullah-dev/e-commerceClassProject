import { Schema } from 'mongoose';

const groupSchema =
  ({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      url: {
        type: String,
      },
      pulic_id: {
        type: String,
      },
    },
  },
  {});
