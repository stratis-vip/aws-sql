const app = require('./src/server')
const HTTP_PORT = process.env.PORT || 8000

app.listen(HTTP_PORT, () => console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT)))
