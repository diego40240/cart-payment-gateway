/* Creation of a variable called reference code which stores the current date 
and it is concatenated with a String */

var referenceCode = "PRODUCT_TEST_" + new Date().toISOString();
// pm.globals.set("reference_code", referenceCode);

/* Creation of a variable called sigString which use several global and environment variables 
to create the String which will be used to create the signature */
var sigString =
  "4Vj8eK4rloUd272L48hsrarnUA" +
  "~" +
  "508029" +
  "~" +
  referenceCode +
  "~" +
  precioTotalCart +
  "~" +
  "PEN";

// Print in the console the value of the sigString variable
console.log(sigString);

/* Creation of a variable called signature which implements hash function (MD5) to be used 
with the variable sigString to create the signature of the payment request */
var signature = CryptoJS.MD5(sigString).toString();

// Set the value of the signature variable to the global variable called signature

console.log(signature);

$("button[role=btn-pagar]").on("click", function () {
  let payForm = new FormData();
  payForm.append("account_pe", "512323");
  payForm.append("referenceCode", referenceCode);
  payForm.append("signature", signature);
  payForm.append("description", listaCart);
  payForm.append("tx_value_pe", precioTotalCart);
  payForm.append("currency_pe", "PEN");

  fetch("src/controller/controllerPayU/cobrarPayU.php", {
    method: "POST",
    body: payForm,
  })
    .then((response) => response.json())
    .then((data) => {
      // Manejar la respuesta de la API aquí
      console.log(data);
    })
    .catch((error) => {
      // Manejar errores de la solicitud
      console.error("Error:", error);
    });
});
