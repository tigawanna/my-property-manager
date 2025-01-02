import { TypedPocketBase, } from "@tigawanna/typed-pocketbase";
import { LocalAuthStore } from "pocketbase";
import { Schema } from "../pb-types";

export type PocketBaseClient = TypedPocketBase<Schema>;
const PB_URL = import.meta.env.VITE_PB_URL;
export const test_pb = new TypedPocketBase<Schema>(PB_URL, new LocalAuthStore("test_token"));
