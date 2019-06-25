var fs=require("fs");
var http=require("http");
var url=require("url");
var calculation=require("./calculation");
var query=require("querystring");
function process_request(req,resp)
{
	var u=url.parse(req.url);
	resp.writeHead(200,{'Content-Type':'text/html'});
   switch(u.pathname){
    case '/':
	fs.readFile("form.html",function(err,data){
	   if(err){
		   resp.write('some error');
		   console.log(err);
		   
	   }else{
     resp.write(data);
	   resp.end();}
    });
	break;
	case '/calc':
	var str="";
	   req.on('data',function(d){
	   str+=d;});
	   req.on('end',function(){
	      console.log(str);
		  var ob=query.parse(str);
		   // var ob2=query.parse(str);
		   // var ob3=query.parse(str);
		   
		  var amount=calculation.print1(ob.amt);
		   var months=calculation.print2(ob.m1);
		   var rate=calculation.emi(ob.amt,ob.m1);
		   
		   
		   

		   
		  resp.write("loan amount: "+amount+"</br>");
		  resp.write("no. of months for loan repayment:"+months+"</br>");
		  resp.end("rate of interest given::"+rate+"</br>");
	   //resp.end();
	   });
	 
   }

}
var server=http.createServer(process_request);
server.listen(8686);

console.log("succeded");
