function isBoolean(value) {
    if (typeof value === "string") {
        return value === "true" || value === "false";
    }
    if (typeof value === "boolean") {
        return value === true || value === false;
    }
    return false;
}

exports.isBoolean = isBoolean;
