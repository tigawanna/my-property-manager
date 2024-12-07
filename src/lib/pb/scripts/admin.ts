import { TypedPocketBase } from "@tigawanna/typed-pocketbase";
import { Schema } from "@/lib/pb/pb-types";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

async function cliAdminPB() {
  if (
    !process.env.PB_ADMIN_EMAIL ||
    !process.env.PB_ADMIN_PASSWORD ||
    !process.env.VITE_PB_URL
  ) {
    throw new Error(
      "Please provide the admin email and password in the .env file",
    );
  }
  const PB_URL = process.env.VITE_PB_URL;
  const pb = new TypedPocketBase<Schema>(PB_URL);

  await pb.from("_superusers").authWithPassword(
    process.env.PB_ADMIN_EMAIL,
    process.env.PB_ADMIN_PASSWORD,
  );
  return pb;
}

async function addRentoToallShops() {
  const pb = await cliAdminPB();
  pb.autoCancellation(false);
  const shops = await pb.from("property_shops").getFullList();
  // c random number between 30000 and 100000
  for (const shop of shops) {
    const randomRent = (Math.floor(Math.random() * 70) + 30) * 1000;
    // await pb.from("property_shops").update(shop.id, {

    // });
  }
}

async function addrandomPayments() {
    const pb = await cliAdminPB();
    pb.autoCancellation(false);
    const shops = await pb.from("property_shops").getFullList({
    });
    for (const shop of shops) {
        for (let month = 0; month < 10; month++) {
        const randomRecieptNumber = Math.floor(Math.random() * 1000000);
        if(month === 0){
        await pb.from("property_shop_payments").create({
          shop: shop.id,
          amount: shop.monthly_rent,
          type: "deposit",
          year: new Date().getFullYear(),
          month: month+1,
          staff:"admin id gpes here",
          reciept_number: "rc-" + randomRecieptNumber,
        });
    }
        await pb.from("property_shop_payments").create({
          shop: shop.id,
          amount: shop.monthly_rent,
          type: "rent",
          year: new Date().getFullYear(),
          month: month+1,
          staff:"admin id gpes here",
          reciept_number: "rc-" + randomRecieptNumber,
        });
    }
        // await pb.from("property_shop_payments").create({
        // shop: shop.id,
        // amount: randomDeposit,
        // type: "rent",
        // year: new Date().getFullYear(),

        // });
    }
}
async function updateAllShops() {
    const pb = await cliAdminPB();
    pb.autoCancellation(false);
    const shops = await pb.from("property_shops").getFullList({
    });
    for (const shop of shops) {
        for (let month = 0; month < 10; month++) {
      // await pb.from("property_shops").update(shop.id,{
     
      //   });
    }
        // await pb.from("property_shop_payments").create({
        // shop: shop.id,
        // amount: randomDeposit,
        // type: "rent",
        // year: new Date().getFullYear(),

        // });
    }
}

updateAllShops()
  .then(() => {
    console.log("All shops have been updated with random rent and deposit");
  })
  .catch((e) => {
    console.log("Error updating shops", e.message);
    console.log("Error updating shops", e.data);
  });
