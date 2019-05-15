function choice(items) {
    var itemNo = Math.floor(Math.random() * items.length);
    var item = items[itemNo];
    return item;
}

function remove(items, item) {
    for(var i=0; i< items.length; i++){
        if(items[i]=== item){
            items.splice(i,1);
        }
    }
}

export {choice, remove};