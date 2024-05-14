import { Hono } from "hono";
import * as cheerio from "cheerio";

const scanner = new Hono();

scanner.get("/", async (c) => {
    const { as, gw, type, mode } = c.req.query();
    const bgpUrl = `https://bgp.he.net/${as.startsWith('AS') ? as : `AS${as}`}`;
    const res = await fetch(bgpUrl);
    const html = await res.text();
    const $ = cheerio.load(html);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const data: any[] = [];
    $(
        "div#prefixes.tabdata table tbody tr, div#prefixes6.tabdata table tbody tr",
    ).each((i, el) => {
        const prefix = $(el).find("td").eq(0).text().trim();
        const description = $(el).find("td").eq(1).text().trim();
        if (prefix !== "Loading Prefixes...") {
            data.push({ prefix, description });
        }
    });
    const routeData = `
/ip route
${data
    .map(
        (d) =>
            `add dst-address="${d.prefix}" gateway="${
                gw === null ? gw : ""
            }" comment="${d.description}"`,
    )
    .join("\n")}
`.trimStart();
    const firewallData = `
/ip firewall address-list
${data
    .map(
        (d) =>
            `add list="${d.description}" address="${d.prefix}" comment="${d.description}"`,
    )
    .join("\n")}
`.trimStart();
    if (data.length === 0) {
        return c.text("No data found or invalid AS number.");
    }
    if (type === "json") {
        return c.json(data);
    }
    switch (mode) {
        case "firewall":
            return c.text(firewallData);
        case "bgp":
            return c.text(routeData);
        default:
            return c.text(firewallData);
    }
});

export default scanner;
