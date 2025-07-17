import { client } from "./lib/client";

function main() {
  const a = client.post.recent.$url();
  console.log("url", a.toString());
}

main();
