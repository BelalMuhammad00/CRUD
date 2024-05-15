let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads= document.querySelector('#ads');
let discount= document.querySelector('#discount');
let total = document.querySelector('#total');
let count = document.querySelector('#count');
let catagory = document.querySelector('#catagory');
let submit= document.querySelector('#submit');

let mood = 'create';
let tmp;
// calculate the total price
function getTotal()
{
    if(price.value !=''){
        let result = (+price.value + +taxes.value  + +ads.value ) - +discount.value ;
        total.innerHTML= result;
        total.style.background = '#4eec40';
    }else{
        total.innerHTML= '';
        total.style.background = '#ec4040';
    };
};

//create product
let datapro;
//save local storage
if(localStorage.product != null){
  datapro = JSON.parse(localStorage.product);
}else{
    datapro = [];
};


submit.onclick = function(){
  let newdata = {
title : title.value.toLowerCase(),
price : price.value,
taxes : taxes.value,
ads : ads.value,
discount : discount.value,
total : total.innerHTML,
count : count.value,
catagory : catagory.value.toLowerCase(),
    };
//count {number of product}

if(title.value !=''
&&price.value!=''
&&catagory.value!=''
&&newdata.count<100
){
    if(mood ==='create'){
        if(newdata.count > 1){
            for(let i=0 ;  i < newdata.count;i++){
                datapro.push(newdata);
            };
        }else{
            datapro.push(newdata);
        };
    }else{
    datapro[ tmp ] = newdata;
    mood = 'create';
    submit.innerHTML = "Create";
    count.style.display= "block";
    }
    cleardata();
}



localStorage.setItem('product',  JSON.stringify(datapro)  );

showproduct();
};
// clear inputs
function cleardata(){
 title.value = '';
 price.value = '';
 taxes.value= '';
 ads.value= '';
 discount.value= '';
total.innerHTML= '';
count.value= '';
 catagory.value = '';
};


//read {show the product}

function showproduct(){
    getTotal();
    let table = '';
    for(let i=0; i < datapro.length;i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].catagory}</td>
        <td><button onclick ="ubdateData(${i})" id="update">update</button></td>
        <td><button onclick ="deleteproduct(${i})" id="delete">delete</button></td>
    </tr>
        `
    };
document.getElementById('tbody').innerHTML = table;
let btndelete = document.querySelector('#deleteAll');
if(datapro.length > 0){
    btndelete.innerHTML = `<button onclick="deleteAllProducts()">Delete All (${datapro.length})</button>`
}else{
    btndelete.innerHTML=``;
};
};

showproduct();

//delete
function deleteproduct(i){
datapro.splice(i,1);

showproduct();
};

function deleteAllProducts(){
    localStorage.clear();
    datapro.splice(0);
    showproduct();
}


//update
function ubdateData(i){
title.value = datapro[i].title;
price.value = datapro[i].price;
taxes.value = datapro[i].taxes;
ads.value = datapro[i].ads;
discount.value = datapro[i].discount;
count.style.display= "none";
getTotal();
catagory.value = datapro[i].catagory;
mood = 'ubdate';
tmp = i;
submit.innerHTML = "Ubdate";
scroll({
    top:0,
    behavior:'smooth',
});
}

//search

let searchMode = 'title';

function getsearchmode(id){
let search = document.querySelector("#search");

    if(id =='searchtitle'){
        searchMode = 'title';
        search.placeholder='Search by Title'
    }else{
        searchMode = 'catagory';
        search.placeholder='Search by Category'
    }
search.focus();
search.value = '';
showproduct();
};

function searchData(value){

let table=''; 

if(searchMode =='title'){
    for(let i=0; i<datapro.length;i++){
        if(datapro[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].catagory}</td>
            <td><button onclick ="ubdateData(${i})" id="update">update</button></td>
            <td><button onclick ="deleteproduct(${i})" id="delete">delete</button></td>
        </tr>
            `
        }
    }
}else{
    for(let i=0; i<datapro.length;i++){
        if(datapro[i].catagory.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].catagory}</td>
            <td><button onclick ="ubdateData(${i})" id="update">update</button></td>
            <td><button onclick ="deleteproduct(${i})" id="delete">delete</button></td>
        </tr>
            `
        }
    }
}
document.getElementById('tbody').innerHTML = table;
}

//clean data