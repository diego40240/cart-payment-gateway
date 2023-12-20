window.mostrarCart = function () {
  let cart = $("div[role=cart]");

  cart.toggleClass("-translate-y-full");

  if (cart.hasClass("-translate-y-full")) {
    $("button[role=btn-cart] svg").attr("aria-hidden", true);
  } else {
    $("button[role=btn-cart] svg").attr("aria-hidden", false);
  }
};

window.itemDelete = function () {
  //Boton delete item cart
  let btn_delete = $("button[role=btn-delete-item]");

  btn_delete.on("click", function () {
    let data_delete = $(this).attr("data-delete");

    fetch(
      "./src/controller/cart.php?data_delete=" + JSON.stringify(data_delete),
      {
        method: "DELETE",
      }
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw "Error en llamada";
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  });
};

$(document).ready(function () {
  //Mostrar/ocultar cart
  let btn_cart = $("button[role=btn-cart]");

  btn_cart.on("click", mostrarCart);
  itemDelete();
});
