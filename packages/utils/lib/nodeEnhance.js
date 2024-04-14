import path from "node:path";
import fs from "node:fs";

/**
 * Synchronous delete file
 * @param {string} filePath
 * @returns
 */
function deleteFileSync(filePath) {
    // TODO: The soft link file does not exist
    // if (!fs.existsSync(filePath)) {
    //     return;
    // }

    fs.unlinkSync(filePath);
}

/**
 * Synchronous delete folder
 * @param {string} folderPath
 * @returns
 */
export function deleteFolderSync(folderPath) {
    if (!fs.existsSync(folderPath)) {
        return;
    }

    // if it is a file, delete the file
    if (fs.lstatSync(folderPath).isFile()) {
        deleteFileSync(folderPath);
        return;
    }

    fs.readdirSync(folderPath).forEach((file) => {
        const filePath = path.join(folderPath, file);

        const a = fs.lstatSync(filePath);
        if (fs.lstatSync(filePath).isDirectory()) {
            deleteFolderSync(filePath); // delete subfolders recursively
        } else {
            deleteFileSync(filePath);
        }
    });

    fs.rmdirSync(folderPath); // delete empty folder
}

/**
 * Copy a file or directory to the specified directory
 * @param {string} sourceDir
 * @param {string} targetDir
 * @returns
 */
export function copyFiles(sourceDir, targetDir) {
    // copy a file
    if (fs.statSync(sourceDir).isFile()) {
        // if it is a file, copy it directly to the destination folder
        const fileName = path.basename(sourceDir);
        const targetFilePath = path.join(targetDir, fileName);
        fs.copyFileSync(sourceDir, targetFilePath);
        return;
    }

    // copy a directory
    // read all files in the source file
    const files = fs.readdirSync(sourceDir);
    files.forEach((file) => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);

        const sourcePathState = fs.statSync(sourcePath);
        if (sourcePathState.isFile()) {
            // if it is a file, copy it
            fs.copyFileSync(sourcePath, targetPath);
        } else if (sourcePathState.isDirectory()) {
            // if it is a folder, the copyFiles function is called recursively
            fs.mkdirSync(targetPath, { recursive: true }); // create a folder with the same name in the destination folder
            copyFiles(sourcePath, targetPath); // copy subfolders recursively
        }
    });
}
