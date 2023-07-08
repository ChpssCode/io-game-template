import { defineComponent, defineQuery, Types } from "bitecs";

//components
export const COMP_rigidbody = defineComponent(); // limit of 65535 entities
export const COMP_entityInfo = defineComponent({ type: Types.ui8, id: Types.i16 }); // Info of the entity
export const COMP_controller = defineComponent({ speed: Types.f32, x: Types.f32, y: Types.f32 }); //used to define entities that are active in the world

//queries
export const QUERY_hasControllers = defineQuery([COMP_rigidbody, COMP_controller]);