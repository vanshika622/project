const fs= require('fs');
const http= require('http');
const url = require('url')

http.createServer((req,res)=>{
    let parsedUrl= url.parse(req.url,true);
    let todos= fs.readFileSync('./Todos.json',{encoding:"utf-8"});
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"DELETE, POST, PUT",
        "Access-COntrol-Allow-Headers":"*"
    })
    if(req.method==='OPTIONS'){
        res.end();
    }
    else if(req.method==='GET' && parsedUrl.pathname==='/todos'){
        let id= parsedUrl.query.id;
        if(id===undefined){
            res.write(todos)
        }
        else{
            let todo= JSON.parse(todos).find((ele,index)=>{
                return Number(ele.id)===(Number.id);
            })
            if(todo!==undefined){
                req.write(JSON.stringify(todo));
            }
            else{
                res.write(JSON.stringify({messge:"Invalid PRoduct id or Something went wrong"}))
            }
        }
        res.end();
    }
    else if(req.method==='DELETE' && parsedUrl.pathname==='/todos'){
        let id= parsedUrl.query.id;
        if(id!==undefined){
            let tasks= JSON.parse(todos);
            let indx= tasks.findIndex((ele, index)=>{
                return Number(ele.id)===Number(id);
            })
            tasks.splice(indx,1);
            fs.writeFile("./todos.json",JSON.stringify(tasks),(err)=>{
                if(err===null){
                    res.write(JSON.stringify({messge:"Todo is deleted",success:true}));
                    res.end();
                }
            })
        }
        else{
            res.write(JSON.stringify({messge:"Invalid Product id"}));
            res.end();
        }
        }
        else if(req.method==='POST' && parsedUrl.pathname==='/todos'){
            let data="";
            req.on("data",(chunk)=>{
                data+=chunk;
            })
            req.on("end",()=>{
                let dataObj= JSON.parse(data);
                let newid= dataObj.id
                let tasks= JSON.parse(todos);
                let index= tasks.findIndex((ele, indx)=>{
                    return Number(ele.id)===Number(newid)
                })
                tasks.push(dataObj);
                fs.writeFile("./Todos.json",JSON.stringify(tasks),(err)=>{
                    if(err==null){
                        res.write(JSON.stringify({message:"todos is added"}))
                        res.end();
                    }
                })
            })
        }
        else if(req.method==='PUT' && parsedUrl.pathname==='/todos'){
            let id= parsedUrl.query.id;
            if(id!==undefined){
            let task= JSON.parse(todos);
            let data="";
            req.on("data",(chunk)=>{
                data+=chunk;
            })
            req.on("end",()=>{
                let dataObj= JSON.parse(data);
                let indexupdated= task.findIndex((task,idx)=>{
                        console.log(task.id)
                    return Number(task.id)===Number(id);
                })
                console.log(indexupdated);
                task[indexupdated]=dataObj;
                fs.writeFile('./Todos.json',JSON.stringify(task),(err)=>{
                    if(err===null){
                        res.write(JSON.stringify({message:"Product updated",success:true}))
                        res.end();
                    }
                })
            })
        }else{
            res.write(JSON.stringify({message:"Invalid product id",success:false}))
                        res.end();
        }
        }
        else{
            res.write(JSON.stringify({message:"Invalid request method",success:false}))
            res.end();
        }


}).listen(8080 ,()=>{
    console.log("Server is listening")
})