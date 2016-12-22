local lor = require("lor.index")
local posts_router = lor:Router()

posts_router:get('/', function (req, res, next) 
    res:json({key = "1234"})
end)

return posts_router
