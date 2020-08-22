import { Schema, model, Types } from 'mongoose';

const schema = new Schema(
    {
        user: {
            _id: Types.ObjectId,
            name: String,
            email: String,
        },
        type: String,
        value: Number,
        executed: Boolean,
        category: {
            _id: Types.ObjectId,
            name: String,
            type: String,
        },
        description: String,
    },
    {
        timestamps: true,
    },
);

const OperationModel = model('Operation', schema);
export default OperationModel;
