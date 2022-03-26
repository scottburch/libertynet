import {PayloadType} from "../payloadType/PayloadType";

type TypeUrl = string
type PayloadTypeRegistry = Record<TypeUrl, PayloadType<unknown>>


export const newPayloadTypeRegistry = ():PayloadTypeRegistry => ({});

export const registerPayloadType = <T, I>(registry: PayloadTypeRegistry, type: PayloadType<T>) =>
    registry[type.getTypeUrl()] = type  as PayloadType<unknown>;

export const getPayloadType = <T>(registry: PayloadTypeRegistry, typeUrl: TypeUrl) => registry[typeUrl];