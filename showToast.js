export function showToast(operation, id){
    const toast = document.createElement("div");
    toast.classList.add("toast");

    if(operation === "add"){
        toast.textContent = `Product with Id ${id} has been added.`
    }
    else{
        toast.textContent = `Product with Id ${id} has been deleted.`
    }

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    },2000);
}