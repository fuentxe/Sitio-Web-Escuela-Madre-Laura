const path = require("path");
module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx$/
            }
        ]
    }
}