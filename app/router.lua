local posts_route = require("app.routes.posts")

return function(app)
    app:use("/posts", posts_route())
end

