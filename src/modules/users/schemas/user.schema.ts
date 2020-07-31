import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        balance: Number

    },
    {
        timestamps: true,
    },
);

export default model('User', schema);
