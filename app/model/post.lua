local DB = require("app.libs.db")
local db = DB:new()

local post_model = {}

function post_model:create(title, slug, markdown)
    return db:query("insert into post(title, slug, markdown) values(?,?,?,?)", 
    	{title, slug, markdown})
end

function post_model:update(post_id, title, markdown)
    return db:query("update post set title=? markdown=? where id=?",
        {title, markdown, tonumber(post_id)})
end

function post_model:delete(post_id)
    local res, err = db:query("delete from post where id=?",
        {tonumber(post_id)})
    if res and not err then
        return true
    else
        return false
    end
end

return post_model
