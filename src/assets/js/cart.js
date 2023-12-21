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
    let padre_element_delete = $(this).closest("li");

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
      .then(function (data) {
        if (data.length == 0) {
          $("ul[role=list]").attr("data-empty-cart", true);
          padre_element_delete.addClass("-translate-x-full");
          setTimeout(() => {
            padre_element_delete
              .closest("ul")
              .html(
                '<li class="py-3 sm:py-4"><div class="flex justify-center items-center text-base font-medium">Empty cart</div></li>'
              );
          }, 300);

          $("div[role=counter-cart]").text(0);
        } else {
          padre_element_delete.addClass("-translate-x-full");
          setTimeout(() => {
            padre_element_delete.remove();
            $("div[role=counter-cart]").text(
              $("ul[role=list]").find("li").length
            );
          }, 300);
        }
      })
      .catch((error) => console.log(error));
  });
};

window.empty_cart = function () {
  //Boton delete all cart

  fetch("./src/controller/cart.php?data_delete=empty", {
    method: "DELETE",
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en llamada";
      }
    })
    .then(function (data) {
      if (data == "empty") {
        $("ul[role=list]").attr("data-empty-cart", true);
        $("ul[role=list]").find("li").addClass("-translate-x-full");
        setTimeout(() => {
          $("ul[role=list]")
            .closest("ul")
            .html(
              '<li class="py-3 sm:py-4"><div class="flex justify-center items-center text-base font-medium">Empty cart</div></li>'
            );
        }, 300);

        $("div[role=counter-cart]").text(0);
      }
    })
    .catch((error) => console.log(error));
};

$(document).ready(function () {
  //Mostrar/ocultar cart
  let btn_cart = $("button[role=btn-cart]");

  btn_cart.on("click", mostrarCart);
  itemDelete();

  let btn_empty = $("button[role=btn-empty-cart]");
  btn_empty.on("click", empty_cart);
});
