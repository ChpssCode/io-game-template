import { BinaryTypes, BufferReader, BufferSchema, BufferWriter, SchemaCollection } from "./BinaryUtils";

export const addPlayerSchema = new BufferSchema(
    [BinaryTypes.u8, BinaryTypes.u16, BinaryTypes.str],
    {
        errorMessage: "Schema1 validation failed!"
});

export const updatePlayerSchema = new BufferSchema(
    [BinaryTypes.u32, BinaryTypes.u32],
    {
        errorMessage: "Schema1 validation failed!"
});
