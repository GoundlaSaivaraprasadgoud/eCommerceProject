document.addEventListener('DOMContentLoaded', () => {


    const HomeContainer=document.getElementById('HomeProducts');
    const productsContainer=document.getElementById('ProductContainer');
    const HomePage=document.getElementById('Home');
    const ProductPage=document.getElementById('Product');
    const SelectedProductPage=document.getElementById('SelectedProduct');
    const SelectedProductDetails=document.getElementById('SelectedProductDetails');
    const CartPage=document.getElementById('Cartpage');
    const CartContainer=document.getElementById('cart-container');
    const emptycart=document.getElementById('emptycart');
    const Carticon=document.getElementById('cart');
    const finalAmountElement=document.getElementById('FinalAmount');
    const totalPriceElement = document.getElementById('TotalPrice');
    const cartblock=document.getElementById('cartblock');
    const gotohome=document.getElementById('gotohome');
    
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let allproducts=[];
    
    navigation('Home');
    
    CartCount();
    
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
        // navigation 
            document.querySelectorAll('.PageButtons').forEach(button =>{
                button.addEventListener('click',(e) =>{
                    navigation(e.target.dataset.target);
                });
            });
            // added
            Carticon.addEventListener('click', (e) => {
                navigation('CartPage');
            });
            gotohome.addEventListener('click', (e) => {
                navigation('HomePage');
            });
    
            HomeContainer.addEventListener('click',(e)=>{
               if(e.target.classList.contains('details-button')){
                DetailsHandling(e.target);
               } else if(e.target.classList.contains('addtocart-button')){
                console.log(e.target);
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
             CartContainer.addEventListener('click',(e)=>{
                if(e.target.classList.contains('fa-minus')){
                    quantitychange(e.target,'fa-minus')
             }else if(e.target.classList.contains('fa-plus')){
                     quantitychange(e.target,'fa-plus')
             }


        });
    
    
    
            //  adding event listner for details page
            SelectedProductDetails.addEventListener('click',(e)=>{
                if(e.target.classList.contains('addtocart-button')){
                    AddtoCartHandling(e.target);
                   }else if (e.target.classList.contains('cart')){
                    navigation('CartPage');
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
                displaycartproducts();
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
                <button class="cart" data-id='${product.id}' >GotoCart</button>
                </div>
            </div>
            `;
            
         };
    
    
    
    
         function createcartcard(product){
            const cartsection=document.createElement('div');
            cartsection.classList.add('Cart-Card')
            cartsection.innerHTML=`
            <img src="${product.image}">
            <h2 >${product.title}</h2>
            <div class="incdec">
             <i id="minus" data-target="${product.id}" class="fa-solid fa-minus"></i>
             <p class="squa" >${product.quantity}</p>
             <i data-target="${product.id}" class="fa-solid fa-plus"></i>
             </div>
             <p class="proqua">${product.quantity} × $${product.price}</p>
            `;
            return cartsection;
         };
    
    
         function displaycartproducts(){
            
            if(cart.length===0){
                cartblock.style.display='none';
                emptycart.style.display="block";
    
            }else{
                emptycart.style.display='none';
                cartblock.style.display='flex';
    
                CartContainer.innerHTML=" ";
                cart.forEach(product=>{
                const card=createcartcard(product);
                CartContainer.appendChild(card);
                });
            };    CartCount();
                  updateCartDetails()
        
            
    
         };
    
         function AddtoCartHandling(button){
            const selectedproduct=allproducts.find(product=>product.id==button.dataset.id);
          
            if(selectedproduct){
               
                const exit=cart.find(element=>element.id==button.dataset.id);
           
                if(exit){
                    exit.quantity++;
                }else {
                    selectedproduct.quantity=1;
                    cart.push(selectedproduct);
                };
    
            };
            localStorage.setItem('cart', JSON.stringify(cart));
            displaycartproducts();
            CartCount();
           
            
         };
    
        function CartCount(){
            document.getElementById('cart').innerHTML=` Cart (${cart.length})`;
            Quantityofcart=cart.reduce((add,item)=>{
                return add+item.quantity;
            },0);
            document.getElementById('quantity').textContent=`Products (${Quantityofcart})`;
            
    
         };
    
         function quantitychange(button,operation){
           const product= cart.find(product=>product.id==button.dataset.target);
           const productindex=cart.findIndex(product=>product.id==button.dataset.target);
           if(operation=='fa-minus'){
    
            if(product.quantity>1){
                product.quantity--;
            }else {
                cart.splice(productindex,1);
            };
                
    
           }else if(operation=='fa-plus'){
                product.quantity++;
           };
    
           localStorage.setItem('cart', JSON.stringify(cart));
           displaycartproducts();
           updateCartDetails()
       
           
         };    
         
         function updateCartDetails() {
    
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(0);
            totalPriceElement.textContent = `$${totalPrice}`;
    
            const FinalPrice=Number(totalPrice)+30;
            finalAmountElement.textContent=`$${FinalPrice}`;
        };
    
    
    });
    
    