import {expect} from "chai";
import {decodeGuid, encodeUid} from "./constants";
import {Some} from "monet";

describe('encodeGuid', () => {
    it('should encode a guid into base64 to compress it', () =>
        Some('3e21a876-854f-11ec-a8a3-0242ac120002')
            .map(encodeUid)
            .map(decodeGuid)
            .forEach(guid => expect(guid).to.equal('3e21a876854f11eca8a30242ac120002'))
    )
})