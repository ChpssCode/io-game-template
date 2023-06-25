import { BinaryTypes, BufferReader, BufferSchema, BufferWriter, SchemaCollection } from "./BinaryUtils";

export const player_schema = new BufferSchema(
    [BinaryTypes.u8, BinaryTypes.u8, BinaryTypes.str],
    {
        errorMessage: "Schema1 validation failed!"
});