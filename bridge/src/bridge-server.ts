import {Request, Response} from "express";
import {JSONRPCResponse} from "json-rpc-2.0";
import {SignedObj} from "@libertynet/engine";
import {DbConnector, NodeId} from "@libertynet/engine/src/dag/DbConnector";
import {newLocalDbConnector} from "@libertynet/engine/src/dag/newLocalDbConnector";
import {map} from 'lodash/fp'

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const { JSONRPCServer } = require("json-rpc-2.0");

const bridgeServer = new JSONRPCServer();


bridgeServer.addMethod('readSignedObjectsSorted', ({connector, keys} :{
    connector: DbConnector,
    keys: string[]
}) => newLocalDbConnector(connector.networkUid).readSignedObjectsSorted(newLocalDbConnector(connector.networkUid), keys)
    .then(map(obj => Buffer.from(SignedObj.encode(obj).finish()).toString('base64'))));

bridgeServer.addMethod('storeSignedObject', ({connector, keys, obj}: {
    connector: DbConnector, keys: string[], obj: string
}) => newLocalDbConnector(connector.networkUid).storeSignedObject(newLocalDbConnector(connector.networkUid), keys, SignedObj.decode(Buffer.from(obj, 'base64'))));

bridgeServer.addMethod('waitUntilNodeIncluded', ({connector, nodeId, timeout}: {
    connector: DbConnector, nodeId: NodeId, timeout?: number
}) => newLocalDbConnector(connector.networkUid).waitUntilNodeIncluded(newLocalDbConnector(connector.networkUid), nodeId, timeout));

bridgeServer.addMethod('searchSignedObjs', ({connector, keys}: {
    connector: DbConnector, keys: string[]
}) =>
    newLocalDbConnector(connector.networkUid).searchSignedObjs(newLocalDbConnector(connector.networkUid), keys)
        .then(map(obj => Buffer.from(SignedObj.encode(obj).finish()).toString('base64')))
)

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/json-rpc", (req: Request, res: Response) => {
    bridgeServer.receive(req.body).then((jsonRPCResponse: JSONRPCResponse) => {
        jsonRPCResponse ? res.json(jsonRPCResponse) : res.sendStatus(204);
    });
});

console.log('rpc bridge listening')
app.listen(3000);