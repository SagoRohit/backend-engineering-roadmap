#!/usr/bin/env node
import { getUserActivity } from "./github";
import "dotenv/config";

const username = process.argv[2];

if (!username) {
    console.log("Usage: npm run dev <username>");
    process.exit(1);
}

(async () => {
    try {
        await getUserActivity(username);
    } catch (error) {
        console.error("Full Diagnostic Error Details:");
        console.error(error);
    }
})();