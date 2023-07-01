import { BinaryTypes, BufferReader, BufferSchema, BufferWriter, SchemaCollection } from "./BinaryUtils";

export const spawn_schema = new BufferSchema(
    [BinaryTypes.u8, BinaryTypes.u16, BinaryTypes.str],
    {
        errorMessage: "Schema1 validation failed!"
});