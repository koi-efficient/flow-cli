class Command {
    // register command
    constructor(instance) {
        if (!instance) {
            throw new Error("command instance cannot be null");
        }

        this.program = instance;
        const cmd = this.program.command(this.command);

        cmd.description(this.description);

        if (this.options?.length > 0) {
            this.options.forEach((option) => {
                cmd.option(...option);
            });
        }

        cmd.action((...parmas) => {
            this.action(parmas);
        });

        cmd.hook("preAction", () => {
            this.preAction();
        });
        cmd.hook("postAction", () => {
            this.postAction();
        });
    }

    get command() {
        throw new Error("command must be required");
    }

    get description() {
        throw new Error("description must be required");
    }

    get options() {
        return [];
    }

    get action() {
        throw new Error("action must be required");
    }

    preAction() {
        // empty, there is no real demand for the time being
    }
    postAction() {
        // empty, there is no real demand for the time being
    }
}

module.exports = Command;
