local config = require("app.config")
local router = require("app.router")
local access_controller = require("app.middleware.access_controller")
local lor = require("lor.index")
local app = lor()

-- session和cookie支持，如果不需要可注释以下配置
local mw_cookie = require("lor.lib.middleware.cookie")
local mw_session = require("lor.lib.middleware.session")
app:use(mw_cookie())
app:use(mw_session({
    timeout = 3600 -- default session timeout is 3600 seconds
}))

app:use(access_controller(config.white_list))

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
