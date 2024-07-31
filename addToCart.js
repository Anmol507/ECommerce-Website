import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getCartProductFromLS();

export const addToCart = ((event, id, stock) => {
    const currentProdElem = document.querySelector(`#card${id}`);

    let quantity = currentProdElem.querySelector(".productQuantity").innerText;

    let price = currentProdElem.querySelector(".productPrice").innerText;
    console.log(quantity, price);

    // let's deal with the local storage here!
    let arrLocalStorageProduct = getCartProductFromLS();
    
    price = price.replace("₹","");
    
    let existingProd = arrLocalStorageProduct.find((curProd) => curProd.id === id)
    console.log(existingProd);

    if(existingProd && quantity > 1){
        let actualQuantity = Number(existingProd.quantity) + Number(quantity);
        price = Number(price * actualQuantity);

        let updatedCart = { id, actualQuantity, price };
        updatedCart = arrLocalStorageProduct.map((currProd) => {
            return currProd.id === id ? updatedCart : currProd
        });
        console.log(updatedCart);

        localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));

        showToast("add", id);
    }

    if (existingProd) {
        return false;
    }


    price = Number(price * quantity);
    quantity = Number(quantity);

    let bunch = { id, quantity, price };
    arrLocalStorageProduct.push(bunch);
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

    updateCartValue(arrLocalStorageProduct);

    showToast("add", id);
});