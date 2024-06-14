import inquirer from "inquirer";

function _make({
    type = "list",
    require = true,
    choices,
    defaultValue,
    message,
    mask = "*",
    validate,
    pageSize,
    loop,
    when,
}) {
    const options = {
        name: "name",
        default: defaultValue,
        message,
        type,
        require,
        mask,
        validate,
        pageSize,
        loop,
        when,
        ...(type === "list"
            ? {
                  choices,
              }
            : {}),
    };

    return inquirer.prompt(options).then((answer) => {
        if (typeof when === "boolean" && !when) {
            return defaultValue;
        }
        return answer.name;
    });
}

export function makeInquirer(params) {
    return _make({ ...params });
}
