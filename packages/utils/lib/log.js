// example：
// log.success("成功了", "some message...");
// log.warn("注意", "some message...");
// log.error("出错了", "some message...");
// log.result("some message...");
import log from "npmlog";

log.heading = process.argv[2];

log.headingStyle = {
    fg: "brightYellow",
};

if (process.argv.includes("--debug") || process.argv.includes("-d")) {
    log.level = "verbose";
} else {
    log.level = "success";
}

log.addLevel("success", 3500, { fg: "green", bold: true });

log.result = (info) =>
    console.log(
        `\x1b[32m
    +-----------------------------+
    |          RESULT!            |
    +-----------------------------+
        \x1b[0m` + `${info}`
    );

export default log;
