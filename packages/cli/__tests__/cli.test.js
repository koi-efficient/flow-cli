import path from "node:path";
import { execaCommandSync } from "execa";

const CLI_PATH = path.join(__dirname, "../bin/cli.js");

const run = (args, options = {}) => {
    return execaCommandSync(`node ${CLI_PATH} ${args.join(" ")}`, options);
};

test("show correct version", () => {
    const { stdout } = run(["", "-V"]);
    const correctVersion = require("../package.json").version;
    expect(stdout).toContain(correctVersion);
});

test("run error command", () => {
    let error = null;
    const inexistence = "inexistence";
    try {
        run([inexistence]);
    } catch (e) {
        error = e;
    }

    expect(error?.message).toContain(`unknown command '${inexistence}'`);
});
