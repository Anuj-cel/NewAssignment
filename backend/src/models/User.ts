import mongoose,{Schema,Document} from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    roles:"user"|"admin";
    createdAt: Date;
}
const UserSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
 
const User= mongoose.model<IUser>('User', UserSchema);
export default User;
