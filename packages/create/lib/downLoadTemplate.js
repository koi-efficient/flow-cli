import path from "node:path";
import fs from "node:fs";
import { homedir } from "node:os";
import { execSync } from "node:child_process";

// TODO: globl data, https://www.npmjs.com/package/glob
/** cache directory */
const CACHE_DIRECTORY_NAME = ".koi-efficient";
const getCachePath = () =>
    path.resolve(
        `${homedir()}/${CACHE_DIRECTORY_NAME}`,
        "addTemplate",
        "node_modules"
    );

function makeCacheDir() {
    const cachePath = getCachePath();

    if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath, { recursive: true });
    }
}

async function addNpmPack(npmName, version) {
    // TODO: What is the difference between pnpm add and npm i
    const command = `npm i ${npmName}@${version}`;
    const cwd = /** Current Working Directory */ getCachePath();

    execSync(command, { cwd });
}

export default function downLoadTemplate(template) {
    const { npmName, version } = template;
    makeCacheDir();

    try {
        // ora
        // const spinner = ora("Downloading template...").start();
        // addNpmPack(npmName, version);
    } catch (error) {
        console.log("download failed", error);
    } finally {
        // spinner.stop();
    }
}
