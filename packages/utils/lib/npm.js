import { httpRequest } from "./index.js";

async function _getNpmInfo(npmName) {
    const registry = "https://registry.npmmirror.com/";
    const url = registry + npmName;
    return await httpRequest(url);
}

export async function getLatestVersion(npmName) {
    const npmInfo = await _getNpmInfo(npmName);
    return npmInfo["dist-tags"].latest;
}
