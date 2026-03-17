const nameInput = document.getElementById("nameInput");
const numberInput = document.getElementById("numberInput");
const expiryInput = document.getElementById("expiryInput");
const cvvInput = document.getElementById("cvvInput");

const cardName = document.getElementById("cardName");
const cardNumber = document.getElementById("cardNumber");
const cardExpiry = document.getElementById("cardExpiry");
const cardCVV = document.getElementById("cardCVV");

const creditCard = document.getElementById("creditCard");

const paymentForm = document.getElementById("paymentForm");
const errorMsg = document.getElementById("errorMsg");


/* NOMBRE */

nameInput.addEventListener("input",function(){

cardName.textContent=this.value || "FULL NAME";

});


/* NUMERO TARJETA */

numberInput.addEventListener("input",function(){

let value=this.value.replace(/\D/g,'');

value=value.replace(/(.{4})/g,'$1 ').trim();

this.value=value;

cardNumber.textContent=value || "#### #### #### ####";

});


/* FECHA */

expiryInput.addEventListener("input",function(){

let value=this.value.replace(/\D/g,'');

if(value.length>2){

value=value.substring(0,2)+"/"+value.substring(2,4);

}

this.value=value;

cardExpiry.textContent=value || "MM/YY";

});


/* CVV ANIMACION */

cvvInput.addEventListener("focus",function(){

creditCard.classList.add("flip");

});

cvvInput.addEventListener("blur",function(){

creditCard.classList.remove("flip");

});

cvvInput.addEventListener("input",function(){

cardCVV.textContent=this.value || "***";

});


/* VALIDACION LUHN */

function validateCardNumber(number){

number = number.replace(/\s/g,'');

let sum = 0;
let shouldDouble = false;

for(let i = number.length -1; i >=0; i--){

let digit = parseInt(number.charAt(i));

if(shouldDouble){

digit *=2;

if(digit>9) digit -=9;

}

sum += digit;

shouldDouble = !shouldDouble;

}

return sum % 10 === 0;

}


/* VALIDAR FECHA */

function validateExpiry(date){

let [month,year] = date.split("/");

if(!month || !year) return false;

month = parseInt(month);
year = parseInt("20"+year);

if(month<1 || month>12) return false;

let today = new Date();
let expiry = new Date(year,month);

return expiry > today;

}


/* FORMULARIO */

paymentForm.addEventListener("submit",function(e){

e.preventDefault();

errorMsg.textContent="";

let name = nameInput.value.trim();
let card = numberInput.value.trim();
let expiry = expiryInput.value.trim();
let cvv = cvvInput.value.trim();


if(!/^[A-Za-z\s]{3,}$/.test(name)){

errorMsg.textContent="Nombre Invalido";
return;

}


if(card.replace(/\s/g,'').length !== 16){

errorMsg.textContent="La Tarjeta Debe Tener Mas De 16 Dígitos.";
return;

}


if(!validateCardNumber(card)){

errorMsg.textContent="Numero De Tarjeta Invalido";
return;

}


if(!validateExpiry(expiry)){

errorMsg.textContent="Tarjeta Expirada o Fecha Invalida";
return;

}


if(!/^\d{3,4}$/.test(cvv)){

errorMsg.textContent="CVV Invalido";
return;

}


alert("Pago Procesado Correctamente 💳");

paymentForm.reset();

});
