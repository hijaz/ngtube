const jsonServer = require('json-server');
const multer = require('multer');

const server = jsonServer.create();
const router = jsonServer.router('db.json');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

server.use(jsonServer.defaults());
server.use(upload.single('file'));
server.use(router);

server.listen(3000, () => {
    console.log('JSON SERVER is running on localhost:3000')
})