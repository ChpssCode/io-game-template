import WebSocket from 'ws';
import { BufferReader } from '../BinaryUtils';
import { player_schema } from '../schemas';

const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", ws => {
    console.log("New client connected!");

    ws.binaryType = "arraybuffer"

    ws.on('message', (data) => {
        console.log("Message Sent!")
        if ( data instanceof ArrayBuffer ) {
            const bufReader = new BufferReader();
             bufReader.readFrom(data);

             try {
             player_schema.validate(bufReader);
             player_schema.validate(bufReader);
             } catch (err) {
             // Do something with the error
            console.log("Error validating Buffer schema: " + err);
            }

            const [firstVal, secondVal, thirdVal] = player_schema.readData(bufReader);

            console.log(thirdVal);
        }
    });

    ws.on("close", () => {
        console.log("Client has disconnected!");
    });
});
