local pwd_secret = require("app.config").pwd_secret
local utils = require("app.libs.utils")
local user_model = require("app.model.user")
local lor = require("lor.index")
local user_router = lor:Router()

user_router:post("/login", function(req, res, next)
    local username = req.body.username 
    local password = req.body.password

    if not username or not password or username == "" or password == "" then
        return res:json({
            success = false,
            msg = "用户名和密码不得为空."
        })
    end

    local is_exist = false
    local userid = 0

    password = utils.encode(password .. "#" .. pwd_secret)
    local result, err = user_model:query(username, password)

    local user = {}
    if result and not err then
        if result and #result == 1 then
            is_exist = true
            user = result[1] 
            userid = user.id
        end
    else
        is_exist = false
    end

    if is_exist == true then
        req.session.set("user", {
            username = username,
            userid = userid
        })
        return res:json({
            success = true,
            msg = "登录成功."
        })
    else
        return res:json({
            success = false,
            msg = "用户名或密码错误，请检查!"
        })
    end
end)

return user_router
