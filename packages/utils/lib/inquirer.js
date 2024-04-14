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
        ...(type === "list"
            ? {
                  choices,
              }
            : {}),
    };

    return inquirer.prompt(options).then((answer) => {
        return answer.name;
    });
}

export function makeInquirer(params) {
    return _make({ ...params });
}
