document.addEventListener('DOMContentLoaded', () => {
    const HomeContainer=document.getElementById('HomeProducts');
    const productsContainer=document.getElementById('ProductContainer');
    const HomePage=document.getElementById('Home');
    const ProductPage=document.getElementById('Product');
    const SelectedProductPage=document.getElementById('SelectedProduct');
    const SelectedProductDetails=document.getElementById('SelectedProductDetails');
    const CartPage=document.getElementById('Cartpage');
    const CartContainer=document.getElementById('cart-container');
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let allproducts=[];
    
    fetch('https://fakestoreapi.com/products')
    .then(
        (response)=>response.json())
        .then((data)=>{
            allproducts=data;
           displayproductcards(allproducts,HomeContainer);
           displayproductcards(allproducts,productsContainer); 
           
           
           document.querySelectorAll('.CategoryButtons').forEach(button => {
            button.addEventListener('click', (e) => {
                filterProducts(e.target.id);
            });
            });
            document.querySelectorAll('.PageButtons').forEach(button =>{
                button.addEventListener('click',(e) =>{
                    navigation(e.target.dataset.target);
                });
            });
    
            HomeContainer.addEventListener('click',(e)=>{
               if(e.target.classList.contains('details-button')){
                DetailsHandling(e.target);
               } else if(e.target.classList.contains('addtocart-button')){
                AddtoCartHandling(e.target);
               }
            });
            productsContainer.addEventListener('click',(e)=>{
                if(e.target.classList.contains('details-button')){
                 DetailsHandling(e.target);
                } else if(e.target.classList.contains('addtocart-button')){
                  AddtoCartHandling(e.target);
                }
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
            <button class="details-button" data-id='${product.id}' >Details</button>
            </div>
            
    
    
            `;
            return card
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
    
    
        function navigation(target) {
            HomePage.style.display='none';
            ProductPage.style.display='none';
            SelectedProductPage.style.display='none';
            CartPage.style.display='none';
    
            if(target==='Home'){
                HomePage.style.display='block';
            }else if(target ==='Product'){
                ProductPage.style.display='block';
            }else if(target === 'SelectedProduct'){
                SelectedProductPage.style.display='block';
            }else if(target === 'CartPage'){
                CartPage.style.display='block';
            }
        };
    
        // details
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
    
         function createcartcard(product){
            const cartsection=document.createElement('div');
            cartsection.classList.add('cartcard')
            cartsection.innerHTML=`

            <img src="${product.image}">
            <h2 >${product.title}</h2>
            <p >${product.quantity} × $${product.price}</p>
            `
            ;

            return cartsection;
         };
    
    
         function displaycartproducts(cart){
            CartContainer.innerHTML=" ";
            if(cart.length===0){
                CartContainer.style.display='none';
            }else{
                CartContainer.style.display='block';
                cart.forEach(product=>{
                const card=createcartcard(product);
                CartContainer.appendChild(card);
            });
            };
    
         };
    
         function AddtoCartHandling(button){
            const selectedproduct=allproducts.find(product=>product.id==button.dataset.id);
          
            if(selectedproduct){
               
                const exist=cart.find(element=>element.id==button.dataset.id);
           
                if(exist){
                    exist.quantity++;
                }else {
                    selectedproduct.quantity=1;
                    cart.push(selectedproduct);
                };
    
            };
            localStorage.setItem('cart', JSON.stringify(cart));
            displaycartproducts(cart);
    
         };
 }); 