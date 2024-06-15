const bcrypt = require("bcrypt");

const plainPw = "test";

async function start() {
  const hash = await bcrypt.hash(plainPw, 10);

  const match = await bcrypt.compare(plainPw, hash);

  console.log(hash, match);
}

start();
