-- 业务路由管理
local userRouter = require("app.routes.user")

return function(app)

    -- simple router: hello world!
    app:get("/hello", function(req, res, next)
        res:send("hi! welcome to lor framework.")
    end)

    -- simple router: render html, visit "/" or "/?name=foo&desc=bar
    app:get("/", function(req, res, next)
        local data = {
            name =  req.query.name or "Marked-Blog",
            desc =  req.query.desc or 'A very fast blog system based on OpenResty and Lor'
        }
        res:render("index", data)
    end)

    -- group router: 对以`/user`开始的请求做过滤处理
    app:use("/user", userRouter())
end

