function addOptionToSelect(select, optionText, optionVal) {
  // create new option element
  const opt = document.createElement('option');

  // create text node to add to option element (opt)
  opt.appendChild( document.createTextNode(optionText) );
  // set value property of opt
  opt.value = optionVal; 

  // add opt to end of select box (sel)
  select.appendChild(opt); 
}

function clearSelect(select) {
  
  var length = select.options.length;
  for (let i = length-1; i >= 0; i--) {
    select.options[i] = null;
  }
 
}

function getProductsForBrand(brand, productsSelect, products) {
  console.log('hi', brand);
  console.log('products', products);
  
  // removes all the current options
  clearSelect(productsSelect);
  
  var pFinal = [];
  
  for(var p of products){
    if(p.brand === brand){
      pFinal.push(p)
    }
  }
  
  console.log(pFinal);
  
  for (let x of pFinal) {
    
    addOptionToSelect(productsSelect, x.name, JSON.stringify(x));
    console.log(x.name);
  }
}