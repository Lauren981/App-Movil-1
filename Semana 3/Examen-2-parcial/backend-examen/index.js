const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
app.use(require('./routes/producto.route'))

app.listen(port, () => {
    console.log(`Servidor iniciado, port=${port}`);
})