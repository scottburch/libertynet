import {PayloadType, SignedObj} from '@libertynet/api';
import {ITextMessage, TextMessage} from "./text-message.pb";
import {encodeUid} from "@libertynet/engine/src/constants";

export const TextMessagePayload: PayloadType<TextMessage> = {
    fromObject: (obj: ITextMessage) => TextMessage.fromObject(obj),
    getTypeUrl: () => 'textMessage',
    getSignString: (textMessage: TextMessage) => JSON.stringify(textMessage),
    fromSignedObj: (signedObj: SignedObj) => TextMessage.decode(signedObj.payload?.value || new Uint8Array()),
    encoder: obj => TextMessage.encode(obj).finish(),
    getUid: () => encodeUid('e2501f25-c7b2')
}