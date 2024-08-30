const HomeContainer=document.getElementById('HomeProducts');
const productsContainer=document.getElementById('ProductContainer');

let allproducts=[];

fetch('https://fakestoreapi.com/products')
.then(
    (response)=>response.json())
    .then((data)=>{
        allproducts=data;
       displayproductcards(allproducts,HomeContainer);
       displayproductcards(allproducts,productsContainer); 
    })
    .catch((error) => {
        console.error('Error fetching products:', error);
    });


    function displayproductcards(products,container){
        container.innerHTML=' ';
        products.forEach(product => {
            const productCard=createproductcard(product);
            container.appendChild(productCard); 
        });
    };
    function createproductcard (product){
        const card = document.createElement('div');
        card.className = 'product-card'; 
        card.innerHTML=`
        <img src="${product.image}">
        <h2 class="title">${product.title}</h2>
        <p class="desc">${product.description}</p>
        <hr>
        <p>$${product.price}</p>
        <hr>
        <div class="buttons">
        <button class="addtocart-button" onclick="addToCart(${product.id})"> Add to Cart</button>
        <button class="details-button" onclick="Details(${product.id})">Details</button>
        </div>
        


        `;
        return card
    };
    
