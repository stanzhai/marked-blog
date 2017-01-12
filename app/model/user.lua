local DB = require("app.libs.db")
local db = DB:new()

local user_model = {}

function user_model:create(username, password)
    local res, err = db:query("insert into user(username, password) values(?,?)", 
    	{username, password})
    return res, err
end

function user_model:query(username, password)
   local res, err = db:query("select * from user where username=? and password=?", {username, password})
   return res, err
end

-- return user, err
function user_model:query_by_username(username)
    local res, err =  db:query("select * from user where username=? limit 1", {username})
    if not res or err or type(res) ~= "table" or #res ~=1 then
        return nil, err or "error"
    end

    return res[1], err
end

return user_model