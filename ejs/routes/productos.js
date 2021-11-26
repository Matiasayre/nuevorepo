import express from"express";
const router = express.Router();
import Contenedor from "../classes/Contenedor.js";
const contenedor = new Contenedor();
import carga from "../services/carga.js";

router.get("/",(req,res)=>{
    contenedor.getAllProductos().then(result=>{
        res.send(result);
    })
})
router.get("/:pid",(req,res)=>{
    let id = parseInt(req.params.pid);
    contenedor.getProductosById(id).then(result=>{
        res.send(result);
    })
})
router.post("/",carga.single("image"),(req,res)=>{
    let producto = req.body;
    producto.precio = parseInt(producto.precio);
    producto.thumbnail;
   
    contenedor.registerProductos(producto).then(result=>{
        res.send(result);
    })
})
router.put("/:pid",(req,res)=>{
    let body = req.body;
    let id = parseInt(req.params.pid);
    contenedor.updateProducto(id,body).then(result=>{
        res.send(result);
    })
})
router.delete("/:pid",(req,res)=>{
    let id= parseInt(req.params.pid);
    contenedor.deleteProducto(id).then(result=>{
        res.send(result)
    })
})

export default router;