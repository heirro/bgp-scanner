import { serve } from "@hono/node-server";
import { Hono } from "hono";
import scanner from "./bgp_scanner";
const app = new Hono();

app.get("/", (c) => {
    return c.text("Hello, World!");
});
app.route("/bgp_scanner", scanner);
const port = 5500;
console.log(`Server is running on port http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
