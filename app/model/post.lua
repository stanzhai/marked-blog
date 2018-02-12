local DB = require("app.libs.db")
local db = DB:new()

local post_model = {}

function post_model:create(title, slug, markdown)
    local res, err = db:query("insert into post(title, slug, markdown) values(?,?,?,?)", 
    	{title, slug, markdown})
    return res, err
end

return post_model
