local string_find = string.find
local lor = require("lor.index")
local router = require("app.router")
local app = lor()

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

router(app)

-- 404 error
app:use(function(req, res, next)
    if req:is_found() ~= true then
        res:status(404):json({
            success = false,
            msg = "404 not found."
        })
    end
end)

-- error handler
app:erroruse(function(err, req, res, next)
    ngx.log(ngx.ERR, err)

    res:status(500):json({
        success = false,
        msg = "500! unknown error."
    })
end)

app:run()
