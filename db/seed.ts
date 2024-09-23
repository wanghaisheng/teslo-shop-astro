import { db, User } from "astro:db";

import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";

const firstUserId = generateIdFromEntropySize(10); // 16 characters long
const secondUserId = generateIdFromEntropySize(10); // 16 characters long
const passwordHash = await hash("qwerty123", {
  // Recommended minimum parameters
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
});

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(User).values([
    {
      id: firstUserId,
      username: "e@example.com",
      password: passwordHash,
    },
    {
      id: secondUserId,
      username: "m@example.com",
      password: passwordHash,
    },
  ]);
}
