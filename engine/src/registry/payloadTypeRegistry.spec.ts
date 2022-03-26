import {PayloadType} from "../payloadType/PayloadType";
import {Some} from "monet";
import {getPayloadType, newPayloadTypeRegistry, registerPayloadType} from "./payloadTypeRegistry";
import {passThrough} from "promise-passthrough";
import {expect} from "chai";

describe('type registry', () => {
    it('should register a type', () =>
        Some(newPayloadTypeRegistry())
            .map(passThrough(registry => registerPayloadType(registry, {
                    getTypeUrl: () => 'my-type'
                } as PayloadType<{foo: string}>)
            ))
            .map(registry => getPayloadType(registry, 'my-type'))
            .map(payloadType => expect(payloadType.getTypeUrl()).to.equal('my-type'))
    )
});