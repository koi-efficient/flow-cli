import { program } from "commander";
import createCommand from "@koi-efficient/create";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packPath = path.resolve(__dirname, "../package.json");
const packageJsonContent = fs.readFileSync(packPath, "utf-8");

const pkg = JSON.parse(packageJsonContent);

export default function (args) {
    console.log(`${Object.keys(pkg.bin)[0]}:`, args);
    program
        .name(Object.keys(pkg.bin)[0])
        .usage("<command> [options]")
        .version(pkg.version);

    createCommand(program);

    program.parse(process.argv);
}
