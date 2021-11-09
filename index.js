const PORT = 3000;
const express = require("express");
const app = express();
const path = require('path');
const apiRoute = require('./routes/api');

app.use('/api', apiRoute); //vem primeiro a chamada a api para garantir que não seja feita uma busca por uma pasta chamada "api";
app.use(express.static(path.join(__dirname, "public"))); //padrão é o path '/'

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});