const HomeContainer=document.getElementById('HomeProducts');
const productsContainer=document.getElementById('ProductContainer');
const HomePage=document.getElementById('Home');
const ProductPage=document.getElementById('Product');

let allproducts=[];

fetch('https://fakestoreapi.com/products')
.then(
    (response)=>response.json())
    .then((data)=>{
        allproducts=data;
       displayproductcards(allproducts,HomeContainer);
       displayproductcards(allproducts,productsContainer); 

        // addevent listener for page buttons
       document.querySelectorAll('.PageButtons').forEach(button =>{
        button.addEventListener('click',(e) =>{
            navigation(e.target.dataset.target);
        });
        
        document.querySelectorAll('.CategoryButtons').forEach(button => {
            button.addEventListener('click', (e) => {
                filterProducts(e.target.id);
            });
            });
    });

    navigation('Home');

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
    
    function navigation(target) {
        HomePage.style.display='none';
        ProductPage.style.display='none';


        if(target==='Home'){
            HomePage.style.display='block';
        }else if(target ==='Product'){
            ProductPage.style.display='block';

    }
    };
    function filterProducts(category){
        
        if(category==='all'){
            displayproductcards(allproducts,HomeContainer);
            displayproductcards(allproducts,productsContainer);
        }
        else{
            const fiteredproducts=allproducts.filter(product=>product.category===category);
            displayproductcards(fiteredproducts,HomeContainer);
            displayproductcards(fiteredproducts,productsContainer);
        }

    };
