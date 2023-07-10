import { defineComponent, defineQuery, Types } from "bitecs";

export const COMP_entityInfo = defineComponent({ type: Types.ui8, id: Types.i16 }); // Info of the entity
export const COMP_position = defineComponent({ x: Types.f32, y: Types.f32 })