exports["test: Feature"] = require("./feature/test_feature");
exports["test: Field"] = require("./feature/test_field");
exports["test: Schema"] = require("./feature/test_schema");
exports["test: Schema"] = require("./feature/test_collection");

if (require.main == module.id) {
    system.exit(require("test").run(exports));
}
