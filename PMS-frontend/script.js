let Allproducts=[];
function getdata(){
    fetch("http://localhost:8000/products",{
        method:"GET"
    })
    .then((response)=>{
       return response.json();
    })
    .then((products)=>{
       Allproducts=products;
       displayData(Allproducts);
    })
    .catch((err)=>{
        console.log(err)
    })
}
getdata();
function displayData(products){
    document.getElementById("products").innerHTML=""
    products.forEach((product, index)=> {
        let tr= document.createElement("tr")
        let notd= document.createElement('td');
        notd.append(index+1);
        tr.appendChild(notd);

        let nametd= document.createElement('td');
        nametd.append(product.name);
        tr.appendChild(nametd);

        let pricetd= document.createElement('td');
        pricetd.append(product.price);
        tr.appendChild(pricetd);

        let quantitytd= document.createElement('td');
        quantitytd.append(product.quantity);
        tr.appendChild(quantitytd);

        let actionstd= document.createElement('td');
         let updateicon= document.createElement('i');
         updateicon.className="icon fa-solid fa-file-pen text-primary"
         updateicon.setAttribute("data-bs-toggle","modal")
         updateicon.setAttribute("data-bs-target","#exampleModal")
         updateicon.addEventListener("click",()=>{
            setupdatemodal(product.id)
         })

         let deleteicon= document.createElement('i');
         deleteicon.className="icon fa-solid fa-trash text-danger"
          deleteicon.addEventListener('click',()=>{
            deleteProduct(product.id)
          })
         actionstd.appendChild(updateicon)
         actionstd.appendChild(deleteicon)

         tr.appendChild(actionstd);

         document.getElementById("products").appendChild(tr)
        
    });
}

function deleteProduct(id){
    
    fetch("http://localhost:8000/products?id="+id,{
        method:"DELETE"
    })
    .then((response)=>response.json())
    .then((message)=>{
        if(message.success===true){
        let indexToDelete= Allproducts.findIndex((product,index)=>{
            return Number(product.id)===Number(id);
        });
        Allproducts.splice(indexToDelete,1);
       
        displayData(Allproducts) 
        openToast(message.message,true)
         
    }
    else{
           openToast(message.message,false)
    }
    
    })
    .catch((err)=>{
        console.log(err)
    })
}

function addData(){
    let products={};
    products.id= Number(document.getElementById("Id").value);
    products.name=document.getElementById("name").value
    products.price=Number(document.getElementById("price").value)
    products.quantity=Number(document.getElementById("quantity").value)

    fetch("http://localhost:8000/products",{
        method:"POST",
        body:JSON.stringify(products),
        headers:{
            "Content-Type":"application/json"
        }

    })
    .then((res)=>res.json())
    .then((msg)=>{
        Allproducts.push(products)
        displayData(Allproducts);
        openToast(msg.message)
       
    })
    .catch((err)=>{
        console.log(err);
    })
}
let idToupdate=null;
function setupdatemodal(id){
    let product=Allproducts.find((product, index)=>{
        return Number(product.id)===Number(id);
    })
    idToupdate=product.id;
    document.getElementById("up_Id").value=product.id;
    document.getElementById("up_name").value=product.name;
    document.getElementById("up_price").value=product.price;
    document.getElementById("up_quantity").value=product.quantity;
}

function updateproduct(){
    
    let products={};
    products.id= Number(document.getElementById("up_Id").value);
    products.name=document.getElementById("up_name").value
    products.price=Number(document.getElementById("up_price").value)
    products.quantity=Number(document.getElementById("up_quantity").value)

    fetch("http://localhost:8000/products?id="+idToupdate,{
        method:"PUT",
        body:JSON.stringify(products),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res)=>res.json())
    .then((msg)=>{
        let productIndex= Allproducts.findIndex((product,index)=>{
            return Number(product.id)===Number(idToupdate);
        })
        
        Allproducts[productIndex]=products
       
        displayData(Allproducts);
        openToast(msg.message)
       
    })
    .catch((err)=>{
        console.log(err);
    })

}
function openToast(msg, success){
    document.getElementById("toast").innerText=msg;
    document.getElementById("toast").style.right=0;
    if(success===false){
        document.getElementById("toast").classList.add("error-msg")
        document.getElementById("toast").classList.remove("success-msg")
 }
 else{
    document.getElementById("toast").classList.add("success-msg")
        document.getElementById("toast").classList.remove("error-msg")
   
 }
    setTimeout(()=>{
        document.getElementById("toast").style.right="-300px"
    },5000)
}