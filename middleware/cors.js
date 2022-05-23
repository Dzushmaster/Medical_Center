function cors(req, res, next){
    console.log(`method: ${req.method}, ${req.headers}`)
    if(req.method === 'OPTIONS')
        next()
    else {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
}
module.exports = cors