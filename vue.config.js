module.exports = {
    devServer: {
        proxy: {
            "^/comics/api/": {
                target: "https://xkcd.com/",
                secure: false,
                pathRewrite: {
                    "/comics/api/*": "/"
                }
            }
        }
    }
}