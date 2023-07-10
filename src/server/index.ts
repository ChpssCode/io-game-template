import WebSocket from 'ws';
import { BufferReader, BufferWriter } from '../BinaryUtils';
import { addPlayerSchema } from '../packetSchemas';
import { ECSworld } from './world';
import { addEntity, addComponent, defineComponent, Types } from 'bitecs';
import { COMP_entityInfo, COMP_position } from '../Components';
import { Controls, ENTITY } from '../Config';
import { CommCode } from '../Config';

const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", ws => {
    console.log("New client connected!");

    ws.binaryType = "arraybuffer"

    ws.on('message', (data) => {
        if(data instanceof ArrayBuffer) {
        const bufReader = new BufferReader();
        bufReader.readFrom(data);

        let commcode = bufReader.readU8()

        switch(commcode) {
            case CommCode.addPlayer: {
                let eid = addEntity(ECSworld)
                addComponent(ECSworld, COMP_entityInfo, eid)

                COMP_entityInfo.type[eid] = ENTITY.PLAYER;
                COMP_entityInfo.id[eid] = eid;

                addComponent(ECSworld, COMP_position, eid)

                console.log("Player joined the game!")

                COMP_position.x[eid] = bufReader.readU8();
                COMP_position.y[eid] = 0;

                console.log(bufReader.readUInt32())
                break;
            }
            case CommCode.keyDown: {
                if(bufReader.readU8() === Controls.UP) {
                    const bufWriter  = new BufferWriter();
                    bufWriter.writeU32(1)
                    ws.send(bufWriter.getBytes)
                }
                break;
            }
        }

        }
    });

    ws.on("close", () => {
        console.log("Client has disconnected!");
    });
});
