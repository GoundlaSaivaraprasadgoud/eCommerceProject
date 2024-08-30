const HomeContainer=document.getElementById('HomeProducts');
const productsContainer=document.getElementById('ProductContainer');
const HomePage=document.getElementById('Home');
const ProductPage=document.getElementById('Product');
const SelectedProductPage=document.getElementById('SelectedProduct');
const SelectedProductDetails=document.getElementById('SelectedProductDetails');

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

        HomeContainer.addEventListener('click',(e)=>{
            if(e.target.classList.contains('details-button')){
             DetailsHandling(e.target);
            } else if(e.target.classList.contains('addtocart-button')){
             AddtoCartHandling(e.target);
            }
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
        <button class="addtocart-button" data-id='${product.id}'> Add to Cart</button>
        <button class="details-button" data-id='${product.id}'>Details</button>
        </div>
        


        `;
        return card
    };
    
    function navigation(target) {
        HomePage.style.display='none';
        ProductPage.style.display='none';
        SelectedProductPage.style.display='none';

        if(target==='Home'){
            HomePage.style.display='block';
        }else if(target ==='Product'){
            ProductPage.style.display='block';
        }else if(target === 'SelectedProduct'){
            SelectedProductPage.style.display='block';
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

    function  DetailsHandling(button){
        const selectedproduct=allproducts.find(product=>product.id==button.dataset.id)
        displayselectedproduct(selectedproduct);
        navigation('SelectedProduct');
     };

     function  displayselectedproduct(product){
        SelectedProductDetails.innerHTML=`

        <img src="${product.image}">
        <div class="details-img-desc">
        <h2 class="category">${product.category}</h2>
        <h2 class="title">${product.title}</h2>
        <p class="rating">${product.rating.rate}<i class="fa-solid fa-star"></i></p>
        <p class="price">$${product.price}</p>
        <p class="desc">${product.description}</p>
            <div class="buttons">
            <button class="addtocart-button" data-id='${product.id}'> Add to Cart</button>
            <button class="gotoCart-button" data-id='${product.id}' >GotoCart</button>
            </div>
        </div>
        `;
        
     };
