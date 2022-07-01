CommandNumber();
//Récupération de l’identifiant de commande

function CommandNumber(){
    const id = new URL(window.location.href).searchParams.get("id");
    
    const orderId = document.getElementById('orderId');
    orderId.innerHTML = id;
    
    localStorage.clear();
}