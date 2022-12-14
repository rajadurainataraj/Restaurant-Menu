import { menuArray } from './data.js';
const container = document.getElementById("container");
let getMenu = ''
let storeData =[]

// array list
menuArray.forEach(function(menu){
getMenu += `<div class="list" id="list" >
<div >  <img class="productImage" src='${menu.emoji}' alt='productImages'/>   </div>
<div class="itemDetails">
            <p class="listname">${menu.name}</p>
            <p class="listingredients">${menu.ingredients}</p> 
            <p class="listprice">$${menu.price}</p>
            </div>
           <div  class="listadd">
         <button class="addOne" id="${menu.id}"  data-add="add">+</button>
           </div> 
        </div>
           `
})
container.innerHTML = getMenu

// add Events
document.addEventListener("click",function(e){
    if(e.target.dataset.add){
   renderPlus(e.target.id)
    }
    if(e.target.dataset.remove){
    console.log("hi")
    removeData(e.target.id)
    }
    if(e.target.dataset.submit){
    inputPopup()
    }

    })


// adding obj
    function renderPlus(id) {
      document.getElementById("yourorder").innerHTML= `<p>Your Order</p>`
    let getSingleObj  = menuArray.find(function(menu){
     return menu.id == id
        })
        let getModifiedObj  = storeData.find(function(menu){
          return menu.id == id
             })
             if(getModifiedObj === undefined){
              storeData.push(getSingleObj)
             }else {
              storeData = storeData.map((items) =>
                items.name === getSingleObj.name
                  ? { ...items, price: items.price + getSingleObj.price }
                  : items
              );
        
            }

        renderDom()
    }
    
// render Item in dom
function renderDom() {

let getval =''
storeData.filter((val,id,array) => array.indexOf(val) == id);
storeData.forEach(function(data){
getval += `<div class="ordercontainer">
<div class="orderChildContainer">
<p class="menuitemName"> ${data.name} </p>
<p class="removedata" id="${data.id}" data-remove="remove">remove</p> 
<p class="pricevalue">$${data.price}</p>
</div>
</div>`
})
document.getElementById('renderItem').innerHTML = getval

getTotal()
    }

// get total
function getTotal(){
document.getElementById('total').innerHTML = `<div class="total"><p>Total price:</p><p class="totalvalue">$ ${storeData.reduce((pre,cur)=>pre+cur.price,0)}</p></div>`;
completeBtn()
}

// remove item
function removeData(id){

    for (let i = storeData.length - 1; i >= 0; i--) {
             if (storeData[i].id === Number(id)) {
                storeData.splice(i, 1);
                break;
              }     
            }
             renderDom()
}
//complete Btn
function completeBtn(){
  const btn = document.querySelector('.btnsubmit')
  btn.innerHTML = `<button class="completeBtn" data-submit="submit">complete order</button>`
}

function inputPopup(){
  document.body.style.background ="#F5F5F5"
  document.getElementById('popup').style.display = "block"
  document.getElementById('popup').innerHTML = 
  ` <div class="inputIteam">
  <h1> Enter Card Details</h1>
  <form id="login-form" data-formvalue="formvalue">
<input name="name" type="text" id="name" placeholder="Enter Your Name" required>
<input name="name" type="number" id="cardNo" placeholder="Enter Your Card Number" required>
<input name="name" type="number" id="cvv" placeholder="Enter Your CVV" required>
<button type="submit" id="btnsubmits" class="btnsubmits"> submit </button>
  </form>
  </div>
  `
}

document.addEventListener("submit",function(e){
  if(e.target.dataset.formvalue){
    formValues(e)
  }
  })
  let datas = ''
function formValues(e){
  e.preventDefault()
  const loginForm = document.getElementById(e.target.id)
    const loginFormData = new FormData(loginForm)
    
    const name = loginFormData.get('name')
    console.log(name)
    datas=name
   document.body.style.background = "#F5F5F5"
   document.getElementById('renderItem').style.display= "none"
   document.getElementById('popup').style.display= "none"
   document.getElementById('btnsubmit').style.display= "none"
   document.getElementById('total').style.display= "none"
   document.getElementById('yourorder').style.display= "none"
   document.getElementById('thanks').style.display= "flex"

  document.getElementById("thanks").innerHTML = `<p class="thankstxt">Thanks, ${datas}! Your Order is on its way!</p>`
}
// document.getElementById('dark').addEventListener("click",function(){
//   document.body.classList.add('dark')
// })
 
