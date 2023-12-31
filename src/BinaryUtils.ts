type SchemaElement = number | [number, number];
type Schema = SchemaElement[];

interface BufferSchemaOptions {
	errorMessage: string;
}

export const BinaryTypes = {
	"u8": 0,
	"u16": 1,
	"u32": 2,
	"str": 3,
};

export const ByteSize = {
	[BinaryTypes.u8]: 1,
	[BinaryTypes.u16]: 2,
	[BinaryTypes.u32]: 4,
};

const DEBUG = false;

const assert = (condition: boolean, err: string) => {
	if (!condition) throw err;
};

export class BufferWriter {
	byteView: Uint8Array;
	arrayBuffer: ArrayBuffer;
	dataView: any;
	offset: number = 0;
	bufferSize: number = 2028;

	static F32Array = new Float32Array;
	static U8Array = new Uint8Array(BufferWriter.F32Array.buffer);

	constructor() {
		this.arrayBuffer = new ArrayBuffer(this.bufferSize);
		this.byteView = new Uint8Array(this.arrayBuffer);
	}

	maxSize(): number {
		return this.arrayBuffer.byteLength;
	}

	writeU8(u8: number) {
		if (DEBUG) assert(
			(Number.isInteger(u8) && (u8 >= 0 && u8 <= (1 << 16) - 1)),
			`invalid u8 provided: ${u8}`
		);

		if (DEBUG) assert(this.offset + 1 < this.maxSize(), `Writing u8 out of bounds ab[${this.offset}]`)

		this.byteView[this.offset++] = u8;
	}

	writeU16(u16: number) {
		if (DEBUG) assert(
			(Number.isInteger(u16) && (u16 >= 0 && u16 <= (1 << 16) - 1)),
			`invalid u16 provided: ${u16}`
		);

		if (DEBUG) assert(this.offset + 2 < this.maxSize(), `Writing u16 out of bounds ab[${this.offset}]`)

		this.byteView[this.offset++] = (u16 & 0xff);
		this.byteView[this.offset++] = ((u16 >> 8) & 0xff);
	}

    writeU32(u32: number): void {
		if (DEBUG) assert(
			(Number.isInteger(u32) && (u32 >= 0 && u32 <= (1 << 16) - 1)),
			`invalid u32 provided: ${u32}`
		);

		if (DEBUG) assert(this.offset + 3 < this.maxSize(), `Writing u32 out of bounds ab[${this.offset}]`)

		this.byteView[this.offset++] = u32 & 255;
		this.byteView[this.offset++] = (u32 >> 8) & 255;
		this.byteView[this.offset++] = (u32 >> 16) & 255;
		this.byteView[this.offset++] = (u32 >> 24) & 255;
	}


	writeString(str: string) {
		const len = str.length;
		this.writeU8(len);
		for (let i = 0; i < len; i++) this.writeU8(str.charCodeAt(i));
	}

	getBytes(): ArrayBuffer {
		const copy = new Uint8Array(this.arrayBuffer, 0, this.offset).slice();
		return copy.buffer;
	}
};

export class BufferReader {
	offset: number = 0;
	bytes: Uint8Array = new Uint8Array();


	size(): number {
		return this.bytes.length;
	}

	readFrom(data: ArrayBuffer) {
		// maybe create a new copy of the arraybuffer to be safe?
		this.bytes = new Uint8Array(data);
		this.offset = 0;
	}

	readU8(): number {
		return this.bytes[this.offset++];
	}

	readU16(): number {
	return this.bytes[this.offset++] | (this.bytes[this.offset++] << 8);
	}

	readUInt32(): number {
	if ((this.offset + 3) > this.bytes.byteLength) console.error(`Offset out of buffer, ${this.offset}`, this.bytes);

	return this.bytes[this.offset++] | (this.bytes[this.offset++] << 8) + (this.bytes[this.offset++] << 16) + (this.bytes[this.offset++] << 24);
    };

	// TODO, add support for utf16
	readShortStr(): string {
		let str = "";
		const len = this.readU8();
		for (let i = 0; i < len; i++) str += String.fromCharCode(this.readU8());
		return str;
	}
};

export class SchemaCollection {
	schemas: BufferSchema[];
	constructor(schemas: BufferSchema[]) {
		this.schemas = schemas;
	}

	validate(bufferReader: BufferReader) {
		let offset = 0;
		const schemas = this.schemas;
		for (let i = 0; i < schemas.length; i++) {
			const schema = schemas[i];
			offset = schema.validate(bufferReader, offset);
		}
	}
}

export class BufferSchema {
	schema: Schema;
	errorMessage: string;
	returnData: any[];

	constructor(schema: Schema, options: BufferSchemaOptions) {
		this.schema = schema;
		this.errorMessage = options.errorMessage;
		this.returnData = [];
	}

	readData(bufferReader: BufferReader): any[] {
		const schema = this.schema;
		for (let i = 0; i < schema.length; i++) {
			const schemaElement = schema[i];

			if (Array.isArray(schemaElement)) {
				let totalElements = schemaElement[0];
				let elementType = schemaElement[1];
				let arr: any[] = [];
				for (let u = 0; u < totalElements; u++) {
					switch (elementType) {
						case BinaryTypes.u8:
							arr.push(bufferReader.readU8());
							break;
						case BinaryTypes.u16:
							arr.push(bufferReader.readU16());
							break;
						case BinaryTypes.str:
							arr.push(bufferReader.readShortStr());
							break;
						case BinaryTypes.u32:
							arr.push(bufferReader.readUInt32());
							break;
						default:
							throw "Schema::readData unknown BinaryType: " + elementType;
					}
				}
				this.returnData[i] = arr;
			} else {
				let elementType = schemaElement;
				switch (elementType) {
					case BinaryTypes.u8:
						this.returnData[i] = bufferReader.readU8();
						break;
					case BinaryTypes.u16:
						this.returnData[i] = bufferReader.readU16();
						break;
					case BinaryTypes.str:
						this.returnData[i] = bufferReader.readShortStr();
						break;
                    case BinaryTypes.u32:
						this.returnData[i] = bufferReader.readUInt32();
					break;
					default:
						throw "Schema::readData unknown BinaryType: " + elementType;
				}
			}
		}

		return this.returnData;
	}

	/*
	*
	*/
	validate(bufferReader: BufferReader, offset = 0): number {
		const schema = this.schema;
		const bufferSize = bufferReader.size();

		for (let i = 0; i < schema.length; i++) {
			const schemaElement = schema[i];
			let totalElements = 1;
			let elementType = -1;

			if (Array.isArray(schemaElement)) {
				totalElements = schemaElement[0];
				elementType = schemaElement[1];
			} else {
				elementType = schemaElement;
			}

			for (let u = 0; u < totalElements; u++) {
				switch (elementType) {
					case BinaryTypes.u8:
						offset += 1;
						break;
					case BinaryTypes.u16:
						offset += 2;
						break;
					case BinaryTypes.str:
						if (offset >= bufferSize) throw this.errorMessage;
						// TODO, when adding UTF-16 support, dont forget to make this increase the offset by 2 bytes at a time
						// ie offset += len * 2
						const len = bufferReader.bytes[offset++];
						offset += len;
						break;
					case BinaryTypes.u32:
						offset += 3;
						break;
					default:
						throw "Schema::validate unknown BinaryType: " + elementType;
				}

			}

			if (offset > bufferSize) throw this.errorMessage;
		}

		return offset;
	}
};