import express from 'express';
import {engine} from 'express-handlebars';
import cors from 'cors';
import carga from "./services/carga.js";
import Contenedor from './classes/Contenedor.js';
const app = express();
const server = app.listen(8080,()=>{
    console.log("server listening on port 8080")
})
const contenedor = new Contenedor();
import productosRouter from "./routes/productos.js";
app.engine('handlebars',engine())
app.set('views','./views')
app.set('view engine','pug')

app.use(carga.single("image"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));
app.use(cors());
// app.use('/imagenes', express.static(__dirname + '/public'));

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
app.get('/view/productos',(req,res)=>{
  contenedor.getAllProductos().then(result=>{
      let info = result.payload;
      let preparedObject ={
          productos : info
      }
      res.render('productos',preparedObject)
  })
})
app.get('/food',(req,res)=>{
  let food = getAllFoods();
  res.render('restaurant',{"foodArray":food})
})