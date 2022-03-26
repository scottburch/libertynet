import {replace} from "lodash/fp";
import {Some} from "monet";
import {Buffer} from 'buffer'

export type DagNetwork = string;

export const encodeUid = (guid: string) =>
    Some(guid)
        .map(replace(/-/g, ''))
        .map(guid => Buffer.from(guid, 'hex'))
        .map(buf => buf.toString("base64"))
        .join();

export const decodeGuid = (b64: string) =>
    Some(b64)
        .map(b64 => Buffer.from(b64, 'base64'))
        .map(buf => buf.toString('hex'))
        .join();


export const Network: Record<'MAINNET' | 'TESTNET' | 'DEVNET', DagNetwork> = {
    MAINNET: encodeUid('33b2cf2e-854e'),
    TESTNET: encodeUid('3e21a876-854f'),
    DEVNET: encodeUid('49b5197a-854f')
};







