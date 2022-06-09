

function myfunction(){
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const items = document.querySelectorAll(".item");

    for(var i=0; i<items.length;i++){
        let match = items[i].getElementsByClassName("card-title")[0];
        if(match){
            let textvalue = match.textContent || match.innerHTML;
            if(textvalue.toUpperCase().indexOf(searchbox) > -1){
                items[i].style.display = "";
            }else{
                items[i].style.display = "none";
            }         
        }
    }
}