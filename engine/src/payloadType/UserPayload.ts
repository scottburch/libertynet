import {PayloadType} from "./PayloadType";
import {IUser, User} from "../user/user.pb";
import {SignedObj} from "../crypto/signed-obj.pb";
import {encodeUid} from "../constants";

export const UserPayload: PayloadType<User> = {
    fromObject: (o: IUser) => User.fromObject(o),
    getTypeUrl: () => 'user',
    getSignString: (user: User) => JSON.stringify(user),
    fromSignedObj: (signedObj: SignedObj) => User.decode(signedObj.payload?.value || new Uint8Array()),
    encoder: obj => User.encode(obj).finish(),
    getUid: () => encodeUid('223ba156-a33c')
}