import {ClientOptions, searchObjects, storeObject} from "@libertynet/api";
import {ITextMessage, TextMessage} from "./text-message.pb";
import {TextMessagePayload} from "./TextMessagePayload";

export const storeTextMessage = (client: ClientOptions, msg: Required<ITextMessage>) =>
    storeObject({
        client,
        keys: [TextMessagePayload.getUid(), client.username, Date.now().toString()],
        payloadType: TextMessagePayload,
        value: TextMessage.create(msg)
    });


export const readTextMessagesForUser = (client: ClientOptions): Promise<TextMessage[]> =>
    searchObjects({
        client,
        keys: [TextMessagePayload.getUid(), client.username, ''],
        payloadType: TextMessagePayload
    });

