import {readSignedObjectsSorted, searchSignedObjs, storeSignedObject, waitUntilNodeIncluded} from "./dag-client";
import {DbConnector} from "./DbConnector";



export const newLocalDbConnector = (networkUid: string): DbConnector => ({
    networkUid,
    readSignedObjectsSorted: readSignedObjectsSorted,
    storeSignedObject: storeSignedObject,
    waitUntilNodeIncluded: waitUntilNodeIncluded,
    searchSignedObjs: searchSignedObjs
});