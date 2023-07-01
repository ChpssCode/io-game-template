import WebSocket from 'ws';
import { BufferReader } from '../BinaryUtils';
import { spawn_schema } from '../Schemas';

const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", ws => {
    console.log("New client connected!");

    ws.binaryType = "arraybuffer"

    ws.on('message', (data) => {
        if(data instanceof ArrayBuffer) {
            const bufReader = new BufferReader();
            bufReader.readFrom(data);

            try {
             spawn_schema.validate(bufReader);
            } catch (err) {
            // Do something with the error
            console.log("Error validating Buffer schema: " + err);
            }


        // read the data from the schema...
        const [firstVal, secondVal, thirdVal] = spawn_schema.readData(bufReader);

        console.log(thirdVal)
        }
    });

    ws.on("close", () => {
        console.log("Client has disconnected!");
    });
});
