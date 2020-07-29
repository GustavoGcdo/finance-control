import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        name: String,
        email: String,
        password: String,

    },
    {
        timestamps: true,
    },
);

export default model('User', schema);
