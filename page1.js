let title =document.getElementById('title');
let price =document.getElementById('price');
let ads =document.getElementById('ads');
let taxes =document.getElementById('taxes');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let submit =document.getElementById('submit');
let category =document.getElementById('category');
let count =document.getElementById('count');
let mode='create';
let temp;
// get total
function get_total()
{
    if(price.value != '')
    {
        total.innerHTML =(+price.value + +ads.value + +taxes.value) - +discount.value;
        total.style.background='#040';
    }else{
        total.style='rgb(130, 9, 9)';
        total.innerHTML='';
    }
    
}

// create 
// save local storage
let data_pro;
if(localStorage.product != null)
{
    data_pro=JSON.parse(localStorage.product);
}else{
    data_pro=[];
}
submit.onclick = function()
{
    let new_pro=
    {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
   if(title.value!=''&&price.value!=''&&category.value!=''&&count.value<=100)
   {
    if(mode ==='create')
   {
    if(new_pro.count>1)
    {
        for(let i=0;i<new_pro.count;i++)
        data_pro.push(new_pro);
    }else
    {
        data_pro.push(new_pro);
    }

   }else
   {
    data_pro[temp]=new_pro;
    mode='create';
    submit.innerHTML='Create';
    count.style.display='block';
   }
   clear_data();
   }



   //save localStorage
    localStorage.setItem('product',JSON.stringify(data_pro));
    show_data();
}



// clear inputs
function clear_data()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    category.value='';
    count.value='';
}
// read
function show_data()
{
    get_total();
    let table='';
    for(let i=0;i<data_pro.length;i++)
    {
        table +=`
        <tbody>
        <td>${i}</td>
        <td>${data_pro[i].title}</td>
        <td>${data_pro[i].price}</td>
        <td>${data_pro[i].taxes}</td>
        <td>${data_pro[i].ads}</td>
        <td>${data_pro[i].discount}</td>
        <td>${data_pro[i].total}</td>
        <td>${data_pro[i].category}</td>
        <td><button onclick="update_data(${i})" id="update">update</button></td>
        <td><button  onclick="delete_data(${i})" id="delete">delete</button></td>
      </tbody>`
        
    }
    document.getElementById('tbody').innerHTML=table;
    let btn_delete=document.getElementById('delete_all');
    if(data_pro.length>0)
    {
        btn_delete.innerHTML=`
        <button onclick="delete_all()">delete all(${data_pro.length})</button>
        `
    }
    else{
        btn_delete.innerHTML='';
    }
}
// count 

// delete
function delete_data(i)
{
    data_pro.splice(i,1);
    localStorage.product=JSON.stringify(data_pro);
    show_data();
}
function delete_all()
{
    localStorage.clear();
    data_pro.splice(0);
    show_data();
}
// update
function update_data(i)
{
    title.value=data_pro[i].title;
    price.value=data_pro[i].price;
    ads.value=data_pro[i].ads;
    discount.value=data_pro[i].discount;
    taxes.value=data_pro[i].taxes;
    category.value=data_pro[i].category;
    get_total();
    count.style.display='none';
    submit.innerHTML='update';
    mode='update';
    temp=i;
    scroll(
        {
            top:0,
            behavior:'smooth'
        }
    )
    

}
// search
let SearchMode='title';
function getSearchMode(id)
{
    let search=document.getElementById('search');
    if(id=='searchTitle')
        SearchMode='title';
    else
        SearchMode='category';

        search.placeholder='Search By '+SearchMode;
        search.focus();
        search.value='';
        show_data();
}
function searchData(value)
{
    let table='';

    for(let i=0;i<data_pro.length;i++)
    {
        if(SearchMode=='title')
        {
                if(data_pro[i].title.includes(value.toLowerCase()))
                {
                    table +=`
                    <tbody>
                    <td>${i}</td>
                    <td>${data_pro[i].title}</td>
                    <td>${data_pro[i].price}</td>
                    <td>${data_pro[i].taxes}</td>
                    <td>${data_pro[i].ads}</td>
                    <td>${data_pro[i].discount}</td>
                    <td>${data_pro[i].total}</td>
                    <td>${data_pro[i].category}</td>
                    <td><button onclick="update_data(${i})" id="update">update</button></td>
                    <td><button  onclick="delete_data(${i})" id="delete">delete</button></td>
                </tbody>`;
                }
        }
        else
        {
                if(data_pro[i].category.includes(value.toLowerCase()))
                {
                    table +=`
                    <tbody>
                    <td>${i}</td>
                    <td>${data_pro[i].title}</td>
                    <td>${data_pro[i].price}</td>
                    <td>${data_pro[i].taxes}</td>
                    <td>${data_pro[i].ads}</td>
                    <td>${data_pro[i].discount}</td>
                    <td>${data_pro[i].total}</td>
                    <td>${data_pro[i].category}</td>
                    <td><button onclick="update_data(${i})" id="update">update</button></td>
                    <td><button  onclick="delete_data(${i})" id="delete">delete</button></td>
                </tbody>`;
                }
        }
    }
           
    document.getElementById('tbody').innerHTML=table;

}

// clean data
show_data();
