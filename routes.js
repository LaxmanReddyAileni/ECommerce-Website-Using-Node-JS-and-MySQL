const fs = require("fs");

const requesthandler=(req,res)=>{
    console.log("hi");
    const method = req.method;
    const url = req.url;
    if (url === "/") {

      res.write("<html>");
      res.write("<head><title>Welcome to / page</title></head>");
      res.write(
        '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
      );
      res.write("</html>");
      return res.end();
    }
  
    if (url === "/message" && method === 'POST') {
      const body = [];
      req.on('data', (chunk) => {//data is stored in chunk
        console.log(chunk);
        body.push(chunk);
  
      });
      req.on('end', () => {
          console.log("ur here");
        const parseBody = Buffer.concat(body).toString();
        console.log("this is a "+parseBody);
       const message = parseBody.split('=')[1];
        fs.writeFileSync("message.txt", message);
       
      });
     
      //fs.writeFileSync('message.txt',"Gear");
      res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
  
    //process.exit();
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello From NodsJS</h1></body>");
    res.write("</html>");
    res.end(); //This is the end its sends to client
}
module.exports=requesthandler;


// module.exports.handler=requesthandler;
// module.exports.sometext="Some random Text";
// exports.handler=requesthandler;//for multiple exports
// exports.sometext="Some random Text";

