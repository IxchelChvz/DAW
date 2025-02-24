import { createServer } from 'node:http';
import fs from 'node:fs';
import querystring from 'node:querystring';

const server = createServer((req, res) => {

    // /login
    var url = req.url;

    var fileName = "";
    
    if (url === "/") {
        fileName = "index.html";
    }
    else if (url === "/login") {
        fileName = "login.html";
    }
    else  if (url ==="/gracias"){ 
        fileName = "gracias.html";
    }
//
    if (req.method === 'GET') {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Not Found');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }
//

    else if (req.method=="POST" && req.url === '/login') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Collect chunks
        });

        req.on('end', () => {
           
            console.log('Full request body:', body); 


            const formData = querystring.parse(body);
            console.log(formData.Nombre);
            console.log(formData.Email);
            console.log(formData.Numero);


            res.writeHead(302, { "Location": "/gracias" });
            res.end('Data received!');
        });
    } else {
        res.end('Send a POST request to /login');
    }
});
    
///


    




// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
