local user_router = require("app.routes.user")
local posts_router = require("app.routes.posts")

return function(app)
    app:use("/user", user_router())
    app:use("/posts", posts_router())
end

