const express = require("express");
const router = express.Router();
const Contenedor = require("../classes/Contenedor");
const contenedor = new Contenedor();
const carga = require("../services/carga")

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

module.exports = router;