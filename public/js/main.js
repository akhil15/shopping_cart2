var dataSaved = {};

// =========================================================
// ============        USER INTERFACE       ================
var UIController = (function(){

    var hideContainers = function(DOMObjects){
        DOMObjects.containerProductsObj.innerHTML = "";
        DOMObjects.containerProductItemObj.innerHTML = "";
        DOMObjects.containerCartObj.innerHTML = "";
    } 
    
    return{
        displayImages: function(serverData, DOMObjects){
            hideContainers(DOMObjects); 

            for(var i = 0 ; i < serverData.products.length; i++ ){
                var StringImage =
                    `
                    <div class="col-lg-4 col-md-4 col-sm-6 col-6">
                        <div class="m-1 mb-4 ">
                            <img class="card-img-top"
                                id="img-$-${serverData.products[i].id}" 
                                src="images/${serverData.products[i].imgurl}" 
                                alt="Card image cap">
                            <div class="name">
                                ${serverData.products[i].name}
                                </div>
                                <div class="category"
                                <span>
                                ${serverData.products[i].category}
                                </span>
                               
                                <span style="margin-left: 67%">
                                ${serverData.products[i].price}
                            </span>
                            </div>
                        </div>
                    </div>`;
                DOMObjects.containerProductsObj.insertAdjacentHTML('beforeend',StringImage);
          }// end of for loop
        }, // end of displayImages

        // ================================

        displayProductSelected(event,DOMObjects){
            var id = event.target.id; 
            var splitId = id.split("-$-");
            var activeProductId = splitId[1];
            console.log('-> activeProductId', activeProductId);

            for (let i = 0; i < dataSaved.products.length; i++) {
                if(dataSaved.products[i].id == activeProductId) {
                    hideContainers(DOMObjects);
                    document.getElementById('left-panel').style.display= "none";

                    var domString =
                        `<div class="row pt-3 m-0" >
                            <div class="col-lg-5 col-sm-6 mb-3">
                                <img src="${dataSaved.products[i].imgurl}" alt="" class="product" id="${dataSaved.products[i].id}">
                            </div>
                            <div class="col-lg-4 col-sm-5 ml-3 pl-0">
                                <h3>${dataSaved.products[i].name}</h3>
                                <label for="category"><strong>Category:</strong></label>
                                <label for="category">${dataSaved.products[i].category}</label>
                                <p>${dataSaved.products[i].description}</p>
                            </div>
                                        
                            <div class="col-lg-2 col-md-12">
                                <div class="pl-2">
                                    <div class="row pl-1">
                                        <ul class="rate-area">
                                            <input type="radio" id="5-star" name="rating" value="5" /><label for="5-star" title="Amazing">5 stars</label>
                                            <input type="radio" id="4-star" name="rating" value="4" /><label for="4-star" title="Good">4 stars</label>
                                            <input type="radio" id="3-star" name="rating" value="3" /><label for="3-star" title="Average">3 stars</label>
                                            <input type="radio" id="2-star" name="rating" value="2" /><label for="2-star" title="Not Good">2 stars</label>
                                            <input type="radio" id="1-star" name="rating" value="1" /><label for="1-star" title="Bad">1 star</label>
                                        </ul>
                                    </div>
                                    <div class="row col-12">
                                        <label for="quantity">Quantity:</label>
                                        <input type="number" id="input-qnty-${dataSaved.products[i].id}" value="1" min="1" style="width:50px" class="ml-3 border rounded border-default">
                                    </div>
                                    <div class="row justify-content-between mt-3">
                                        <label for="price" class="col-6">
                                            Price:`+ " " +`${dataSaved.products[i].price}`+ " " +
                                            `<i class="ion-social-euro"></i>
                                        </label>
                                    </div>
                                    <div class="row col-12 mt-2">
                                        <button class="btn btn-info btn-sm float-right" id="add-item-btn-${dataSaved.products[i].id}">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    DOMObjects.containerProductItemObj.insertAdjacentHTML('afterbegin',domString);  
                    break;
                    console.log("this message mustn't print")    
                }     
            }
        },

        displayCartItems: function(DOMObjects, cartArray, totals){
            console.log('im displayCartItems cartArray=',cartArray , 'cart.length=', cartArray.length);
            
            hideContainers(DOMObjects);
            var domString ="";
            if(cartArray.length > 0){
                for(var i = 0 ; i < cartArray.length; i++ ){
                    domString =
                    `<div class="media cart-item row border-bottom mt-3 pb-3">
                        <div class="media-left  col-lg-3 col-md-4">
                            <img src="images/${cartArray[i].products.imgurl}" class="media-object" style="width:100%; height:200px;">
                        </div>
                        <div class="media-body col-lg-7 col-md-5">
                            <h4 class="media-heading">${cartArray[i].products.name}</h4>
                            <p class="description">${cartArray[i].products.description}</p>
                        </div>
                        <div class="col-3">
                            <div class="row col-12">
                                <label for="quantity">Quantitiy: ${cartArray[i].quantity}</label>
                            </div>
                            <div class="row mt-3">
                                <label for="price" class="">Price/pc: ${cartArray[i].products.price}
                                <i class="ion-social-euro"></i></label>
                                <label for="price" class="">total: ${((cartArray[i].products.price)*(cartArray[i].quantity)).toFixed(2)}
                                <i class="ion-social-euro"></i></label>
                            </div>
                            <div class="row col-12 mt-2">
                                <button class="btn btn-danger btn-sm text-white" id="delete-item-btn-${cartArray[i].products.id}">
                                        <i class="ion-android-delete" id="delete-item-btn-${cartArray[i].products.id}" ></i>
                                    </button>
                            </div>
                        </div>
                    </div>`
                    
                    DOMObjects.containerCartObj.insertAdjacentHTML('beforeend',domString);
                    
                }// end of for loop
                domString =
                    `<div class="media">
                        <div class="row col-12 justify-content-between mt-3">
                            <div class= "">
                                <h6 class="media-heading">Total Cart:</h6>
                            </div>
                            <div class="pr-5">
                                <label for="price" class="" id="total-payments-id">${totals.totalPayment}
                                <i class="ion-social-euro"></i></label>
                                <div class="col=12">
                                    <button class="btn btn-success btn-sm text-white" id="buy-now-btn">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    DOMObjects.containerCartObj.insertAdjacentHTML('beforeend',domString);
            }else{
                domString =
                        `<div class="media">
                            <div class= "">
                                <h4 class="media-heading">Total Cart: Your cart is empty choose some of products!</h4>
                            </div>
                        </div>`;
                DOMObjects.containerCartObj.insertAdjacentHTML('beforeend',domString);
            }
        },
        displayCartQnty: function(DOMObjects,cartArray){
            let qnty = 0;
            for (let i = 0; i < cartArray.length; i++) {
                qnty += Number(cartArray[i].quantity);
            }
            DOMObjects.quantityObj.innerHTML = ": " + qnty; 
        },
        displayTotalPayment: function(totals){
            document.getElementById('total-payments-id').innerHTML=totals.totalPayment + " €";///////////////
        },
        clearContainerCart: function(DOMObjects){
            hideContainers(DOMObjects);
            let domString = `<h4>Thank you, your order in process! see you again! </h4>`;
            DOMObjects.containerCartObj.insertAdjacentHTML('beforeend',domString);
        }
        
      }
})();



// =========================================================
// ============         MAIN CONTROLLER     ================
var controller = (function(serverCtrl,UICntrl,cartCtrl){
    var DOMObjects = {

      containerProductsObj: document.getElementById("container-products-id"),
      containerProductItemObj: document.getElementById('container-item-detail-id'),
      containerCartObj: document.getElementById("container-cart-id"),
    }
    
    var navClickFunction =function(url){
        serverCtrl.getDataFromServer(url, function(objRecieved){
            UICntrl.displayImages(objRecieved, DOMObjects);
        });
    }

    var setupEventListeners = function(){
        DOMObjects.containerProductsObj.addEventListener('click',function(event){
            UICntrl.displayProductSelected(event,DOMObjects);
            DOMObjects.containerProductItemObj.onclick = function(event){
                let id = event.target.id;
                let newId = id.split("-item-btn-");
               
            };
        });

	  }//end of setupEventListeners()

    return{
      init: function(){
        console.log('The page start here...')
        //1)
        serverCtrl.getDataFromServer("product",function(objRecieved){
        //2)
            UICntrl.displayImages(objRecieved, DOMObjects);
        });
        //3)
        cartCtrl.calculateCart();
        //4)
        setupEventListeners();
        //5)
        UICntrl.displayCartQnty(DOMObjects, cartCtrl.getCart());
        
        
        
      }
    }
})(serverController,UIController,cartController);

controller.init();
