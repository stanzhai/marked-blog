local smatch = string.match
local sfind = string.find

local function is_login(req)
    local user
    if req.session then
        user =  req.session.get("user") 
        if user and user.username and user.userid then  
            return true, user
        end
    end
    
    return false, nil
end

local function check_login(whitelist)
    return function(req, res, next)
        local requestPath = req.path
        local in_white_list = false
        if requestPath == "/" then
            in_white_list = true
        else
            for i, v in ipairs(whitelist) do
                local match, err = smatch(requestPath, v)
                if match then
                    in_white_list = true
                end
            end
        end

        local islogin, user = is_login(req)

        if in_white_list then
            res.locals.login = islogin
            res.locals.username = user and user.username
            res.locals.userid = user and user.userid
            res.locals.create_time = user and user.create_time
            next()
        else
            if islogin then
                res.locals.login = true
                res.locals.username = user.username
                res.locals.userid = user.userid
                res.locals.create_time = user.create_time
                next()
            else
                res:status(403):json({
                    msg = "该操作需要先登录."
                })
            end
        end
    end
end

return check_login

