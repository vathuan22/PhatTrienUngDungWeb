'use strict'

const express = require('express')

const app = express();

const port = process.env.PORT || 8080



app.get("/", (req, res) => { res.send('Chao ban den voi TeoShop!');

});


app.listen(port, () => { console.log(`server dang chay tren cong ${port}`);

});