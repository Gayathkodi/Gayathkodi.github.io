if (document.readyState == "loading") 
    {
        document.addEventListener('DOMContentLoaded', ready)
    } 
else 
    {
        ready();
    }

function ready() {
    var removeCartItemButton = document.getElementsByClassName('remove_button');

    for (var i = 0; i < removeCartItemButton.length; i++) {
        var button = removeCartItemButton[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInput = document.getElementsByClassName('cart_quantity_input')
    for(var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i]
        input.addEventListener('change', changedQty)
    }

    var addToCartButton = document.getElementById('add_to_cart_button');
    addToCartButton.addEventListener('click', addToCartClicked)

    
    var purchaseBtn = document.getElementById('place_order_button');
    purchaseBtn.addEventListener('click', purchaseBtnClicked)
}

function drinkchoice(x){
    if (x==0){
        document.getElementById('milk_type').style.display='block';
    }
    else{
        document.getElementById('milk_type').style.display='none';
    }
    return;
}

function purchaseBtnClicked(/*event*/) {
    var priceElement = document.getElementsByClassName('cart_total_price')[0]
    var price = parseFloat(priceElement.innerText.replace('LKR', ''));
    if(price == 0) {
        window.alert("Dear Sir/Madam,\nPlease order your items\n\nThank you.")
    }else {
        window.alert(`Order Successfully Placed!\nYour Total: ${price} LKR`)
    }

    var cartItems = document.getElementsByClassName('cart_items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart_items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart_row')
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart_price')[0]
        var quantityElem = cartRow.getElementsByClassName('cart_quantity_input')[0]
        var price = parseFloat(priceElement.innerText.replace('LKR', ''));
        var quantity = quantityElem.value;
        total = total + (price*quantity);

    }
    document.getElementsByClassName('cart_total_price')[0].innerText = total + " LKR"
}

function addToCartClicked() {
    if(document.getElementById("LATTE").checked) {
        type = "LATTE";
    } else if(document.getElementById("CAPPUCHINO").checked) {
        type = "CAPPUCHINO";
    } else if(document.getElementById("FLAT_WHITE").checked) {
        type = "FLAT_WHITE";
    } else if(document.getElementById("ESPRESSO").checked) {
        type = "ESPRESSO";
    } else if(document.getElementById("AMERICANO").checked) {
        type = "AMERICANO";
    }

    var size_var = document.getElementById('cup_size')
    var size = size_var.options[size_var.selectedIndex].value;

    var milk_choice_var = document.getElementById('milk_choice')
    var milk = milk_choice_var.options[milk_choice_var.selectedIndex].value;

    var flav_var = document.getElementById('topping_type')
    var flavour = flav_var.options[flav_var.selectedIndex].value;

    var no_shots_var = document.getElementById('number_of_shots');
    var shots = no_shots_var.value;

    var price = 0;

    //calc price 
    switch(size) {
        case "SMALL":
            price = price + 200
            break;
        case "MEDIUM":
            price = price + 250
            break;
        case "LARGE":
            price = price + 300
            break;
    }

    switch(flavour) {
        case "SUGAR":
            price = price + 0;
            break;
        case "CREAM":
            price = price + 50;
            break;
        case "BOTH":
            price = price + 50;
        break;
    }

    if(shots) {
        no_shots_var = 25 * shots;
        price = price + no_shots_var;
    } else {
        shots = 0
    }
    addItemToCart(type, size, milk, flavour, shots, price);
    addentry(type, size, milk, flavour, shots, price);
    updateCartTotal()
}

function changedQty(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addItemToCart(type, size, milk, flavour, shots, total) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart_row')
    var cartItems = document.getElementsByClassName('cart_items')[0]
    var cartRowContents = `
        <div class="cart_item">
            <div class="cart_column">
                <div class="cart_item_title">
                    <strong>TYPE:</strong> ${type}<br> <strong>SIZE:</strong> ${size} <br> <strong>MILK:</strong> ${milk} <br> <strong>TOPPING:</strong> ${flavour} <br> <strong>SHOTS:</strong> ${shots}
                </div>
            </div>        
        </div>
        <div class="cart_price cart_column price">${total} LKR</div>
        <div class="cart_quantity cart_column">
            <input class="cart_quantity_input" type="number" value="1">
            <button class="remove_button" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('remove_button')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart_quantity_input')[0].addEventListener('change', changedQty)

}


let orderfavbtn = document.getElementById('order_fav');
let btnadd = document.getElementById('add_fav');

orderfavbtn.addEventListener('click', retriveData);
btnadd.addEventListener('click', storeData);

function addentry(type, size, milk, flavour, shots, total) {
    data = {
        "Drink:": type,
        "Cup Size:": size,
        "Milk:": milk,
        "Extra:": flavour,
        "No. of Shots": shots.value,
        "Total": total.value
    };
}

function storeData(){
    localStorage.setItem('data', JSON.stringify(data));
}

function retriveData(){
    JSON.parse(localStorage.getItem('data'));
    addItemToCart()
}
