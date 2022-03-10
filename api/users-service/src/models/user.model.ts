import mongoose, { Schema, Document } from  'mongoose';

export interface UserDocument extends Document {
    polygon_address: string,
    pseudo: string,
    mail: string,
    jobs: Array<Schema.Types.ObjectId>,
    avatar: Schema.Types.ObjectId | null,
    jwt_token: string | null
}

const userSchema = new Schema<UserDocument>({
    polygon_address: { type: String, required: true },
    mail: { type: String },
    pseudo: { type: String },
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    avatar: {type: Schema.Types.ObjectId, ref: 'Avatar'},
    jwt_token: {type: String}
})

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;