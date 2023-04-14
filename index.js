let item = document.getElementById('item');
let description = document.getElementById('description');
let price = document.getElementById('price');
let quantity = document.getElementById('quantity');
let form = document.getElementById('form');
let items = document.getElementById('items');

form.addEventListener('submit',onSubmit);
items.addEventListener('click',clicked);

window.addEventListener("DOMContentLoaded",() => {
    axios.get('https://crudcrud.com/api/5c25ee4be68348de9c231aa31ad0d405/generalstore')
    .then( (res) => {
        for(let i=0;i<res.data.length;i++){
            showOutput(res.data[i]);
        }
    })
    .catch(err => console.log(err));
})

function onSubmit(e){
    e.preventDefault();

    const obj = {
        item : item.value,
        description : description.value,
        price : price.value,
        quantity : quantity.value
    }

    axios.post('https://crudcrud.com/api/5c25ee4be68348de9c231aa31ad0d405/generalstore',obj)
    .then( res => showOutput(res.data))
    .catch(err => console.log(err));
}


function showOutput(data){
    let li = document.createElement('li');
    li.className = "list-group-item";
    li.setAttribute('data-id',data._id);
    li.innerText = `${data.item} - ${data.description} - ${data.price} - ${data.quantity} `;
    addFunctionality(li);
    items.appendChild(li);

}


function clicked(e){
    if(e.target.classList.contains('buy')){
        let li = e.target.parentElement;

        let arr = li.textContent.split(' - ');
        let item = arr[0];
        let description = arr[1];
        let price = parseInt(arr[2]);
        let quantity = parseInt(arr[3].split(" ")[0]);
        let number = parseInt(e.target.textContent.split(" ")[1]);
        quantity-=number;
        if(quantity === 0)
        li.style.display = "none";
        let id = li.getAttribute('data-id');

        const obj = {
            item,
            description,
            price,
            quantity
        }

        axios.put(`https://crudcrud.com/api/5c25ee4be68348de9c231aa31ad0d405/generalstore/${id}`,obj)
        .then( (res) => {
            li.innerText = `${obj.item} - ${obj.description} - ${obj.price} - ${obj.quantity} `;
            addFunctionality(li);
        })
        .catch(err => console.log(err));

    }
}

function addFunctionality(li){
    let b1 = document.createElement('button');
    b1.className = "buy1 buy ml-2";
    b1.style.float = "right";
    b1.innerText ="Buy 1";

    let b2 = document.createElement('button');
    b2.className = "buy2 buy ml-2";
    b2.style.float = "right";
    b2.innerText ="Buy 2";

    let b3 = document.createElement('button');
    b3.className = "buy3 buy ml-2";
    b3.style.float = "right";
    b3.innerText ="Buy 3";


    li.appendChild(b1);
    li.appendChild(b2);
    li.appendChild(b3);
}