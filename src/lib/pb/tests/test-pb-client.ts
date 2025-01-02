import { TypedPocketBase, } from "@tigawanna/typed-pocketbase";
import { LocalAuthStore } from "pocketbase";
import { Schema } from "../pb-types";



async function adminPB() {
  if (
    !process.env.PB_ADMIN_EMAIL ||
    !process.env.PB_ADMIN_PASSWORD ||
    !process.env.VITE_PB_URL
  ) {
    throw new Error(
      "Please provide the admin email and password in the .env file",
    );
  }
const PB_URL = import.meta.env.VITE_PB_URL;
const test_pb = new TypedPocketBase<Schema>(
  PB_URL,
  new LocalAuthStore("test_token"),
);

  await test_pb
    .from("_superusers")
    .authWithPassword(
      process.env.PB_ADMIN_EMAIL,
      process.env.PB_ADMIN_PASSWORD,
    );
  return test_pb;
}

export async function impersonateTenant() {
const pb = await adminPB();
// const tenanatPB = pb.impersonate()
 await pb.from("_superusers").authWithPassword("admin", "password");
}
