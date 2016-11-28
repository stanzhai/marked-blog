local string_find = string.find
local lor = require("lor.index")
local router = require("app.router")
local app = lor()

-- 模板配置
app:conf("view enable", true)
app:conf("view engine", "tmpl")
app:conf("view ext", "html")
app:conf("views", "./app/views")

-- session和cookie支持，如果不需要可注释以下配置
local mw_cookie = require("lor.lib.middleware.cookie")
local mw_session = require("lor.lib.middleware.session")
app:use(mw_cookie())
app:use(mw_session({
    timeout = 3600 -- default session timeout is 3600 seconds
}))

-- 自定义中间件1: 注入一些全局变量供模板渲染使用
local mw_inject_version = require("app.middleware.inject_app_info")
app:use(mw_inject_version())

-- 自定义中间件2: 设置响应头
app:use(function(req, res, next)
    res:set_header("X-Powered-By", "Lor framework")
    next()
end)

router(app) -- 业务路由处理

-- 404 error
app:use(function(req, res, next)
    if req:is_found() ~= true then
        if string_find(req.headers["Accept"], "application/json") then
            res:status(404):json({
                success = false,
                msg = "404! sorry, not found."
            })
        else
            res:status(404):send("404! sorry, not found. " .. (req.path or ""))
        end
    end
end)

-- 错误处理插件，可根据需要定义多个
app:erroruse(function(err, req, res, next)
    ngx.log(ngx.ERR, err)

    if string_find(req.headers["Accept"], "application/json") then
        res:status(500):json({
            success = false,
            msg = "500! unknown error."
        })
    else
        res:status(500):send("unknown error")
    end
end)

return app
