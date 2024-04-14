import path from "node:path";
import fs from "node:fs";
import { homedir } from "node:os";
import { nodeEnhance } from "@koi-efficient/utils";

/** cache directory */
const CACHE_DIRECTORY_NAME = ".koi-efficient";
const getCachePath = () =>
    path.resolve(
        `${homedir()}/${CACHE_DIRECTORY_NAME}`,
        "addTemplate",
        "node_modules"
    );

export default function installTemplate(templateInfo, opts) {
    const { name, template } = templateInfo;
    const { force } = opts;

    const rootDir = process.cwd();
    const installDir = path.resolve(`${rootDir}/${name}`);
    if (fs.existsSync(installDir)) {
        if (!force) {
            console.error(
                `folder ${name} already exists in the current directory`
            );
            return;
        } else {
            nodeEnhance.deleteFolderSync(installDir);
        }
    }

    fs.mkdirSync(installDir, { recursive: true });

    // copyFile
    const originFile = path.resolve(
        getCachePath(),
        template.npmName,
        "template"
    );
    console.log("copying a template file...");
    nodeEnhance.copyFiles(originFile, installDir);
    console.log("template copy succeeded");
}
