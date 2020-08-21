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
        executed: Boolean
    },
    {
        timestamps: true,
    },
);

const OperationModel = model('Operation', schema);
export default OperationModel;
