import WebSocket from 'ws';
import { BufferReader } from '../BinaryUtils';
import { addPlayerSchema } from '../packetSchemas';
import { ECSworld } from './world';
import { addEntity, addComponent, defineComponent, Types } from 'bitecs';
import { COMP_entityInfo } from '../Components';
import { ENTITY } from '../Config';
import { CommCode } from '../Config';

const Position = defineComponent({
    x: Types.f32, 
    y: Types.f32
})

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

                addComponent(ECSworld, Position, eid)

                console.log("Player joined the game!")

                Position.x[eid] = bufReader.readU8();
                Position.y[eid] = 0;

                console.log(bufReader.readUInt32())
                break;
            }
        }

        }
    });

    ws.on("close", () => {
        console.log("Client has disconnected!");
    });
});
