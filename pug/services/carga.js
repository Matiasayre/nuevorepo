import multer from "multer" ;

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public")
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+"."+file.mimetype.split("/")[1])
    }
})
const carga = multer({storage:storage});

export default carga;