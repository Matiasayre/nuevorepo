const express = require('express');
const cors = require("cors")
const carga = require("./services/carga")
const Contenedor = require('./classes/Contenedor');
const app = express();
const server = app.listen(8080,()=>{
    console.log("server listening on port 8080")
})
const contenedor = new Contenedor();
const productosRouter = require("./routes/productos");

app.use(carga.single("image"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));
app.use(cors());
app.use('/imagenes', express.static(__dirname + '/public'));

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send("error en el servidor");
})
app.use("/api/productos",productosRouter);



app.post("/api/uploadfile",carga.single("image"),(req,res)=>{
const file = req.file;

if(!file||file.length===0){
  res.status(500).send({message:"no se subio el archivo"})
}
res.send(file);
})