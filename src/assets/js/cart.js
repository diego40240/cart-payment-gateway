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
            //Elimnar boton modal pagar
            $("button[role=modal]").remove();
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
          //Elimnar boton modal pagar
          $("button[role=modal]").remove();
        }, 300);

        $("div[role=counter-cart]").text(0);
      }
    })
    .catch((error) => console.log(error));
};

window.btnPagar = function () {
  $("button[role=modal]").on("click", function () {
    if ($("#crud-modal").hasClass("hidden")) {
      $("#crud-modal").removeClass("hidden");
      $("#crud-modal").addClass(
        "flex bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"
      );
    }
    $(document).mouseup(function (e) {
      if ($("#form-modal").has(e.target).length === 0) {
        $("#crud-modal").addClass("hidden");
      }
      $("button[role=cerrar-modal]").on("click", function () {
        $("#crud-modal").addClass("hidden");
      });
    });
  });
};

window.preciosItems = function () {
  if ($("button[data-modal-target=crud-modal]")) {
    $("button[data-modal-target=crud-modal]").on("click", function () {
      let totalCart = $("ul[role=list]").find("div[role=precio-item]");
      let precio_total = 0;
      let title_items = $("ul[role=list]").find("p[role=title-item]");
      let count_items = document.querySelectorAll("input[data-input-counter]");
      let title_prod = "";

      for (const key in totalCart) {
        if (!isNaN(parseInt(key))) {
          //Modal - Precio
          precio_total +=
            parseFloat(totalCart[key].innerText.replace("$", "")) *
            count_items[key].value;
          //Modal - Titulo de productos
          title_prod +=
            "<span class='block mb-2 text-gray-500'>- " +
            title_items[key].innerText +
            "<span class='text-gray-900 font-medium'> x" +
            count_items[key].value +
            "</span></span>";
          $("div[data-cart]")
            .find("h3[data-cart-productos] + div")
            .html(title_prod);
        }
      }
      // console.log(precio_total);
      $("div[data-cart]").find("h3[data-cart-total]>span").text(precio_total);

      // let title_items = $("ul[role=list]").find("p[role=title-item]");
      // let count_items = document.querySelectorAll("input[data-input-counter]");
      // let title_prod = "";
      // for (const key in title_items) {
      //   if (!isNaN(parseInt(key))) {
      //     title_prod +=
      //       "<span class='block mb-2 text-gray-500'>- " +
      //       title_items[key].innerText +
      //       "x" +
      //       count_items[key].value +
      //       "</span>";
      //     $("div[data-cart]")
      //       .find("h3[data-cart-productos] + div")
      //       .html(title_prod);
      //   }
      // }
    });
  }
};

window.contador = function (key) {
  let li_key = document.querySelector(`li#item-${key}`);
  let btn_decrement = li_key.querySelector("button[data-decrement]");
  let btn_increment = li_key.querySelector("button[data-increment]");
  let input_counter = li_key.querySelector("input[data-counter]");

  btn_decrement.addEventListener("click", function () {
    let input_value = parseInt(input_counter.value);
    if (input_value > 1) {
      input_counter.value = input_value - 1;
    }
  });
  btn_increment.addEventListener("click", function () {
    let input_value = parseInt(input_counter.value);
    if (input_value < 50) {
      input_counter.value = input_value + 1;
    }
  });
};

$(document).ready(function () {
  //Mostrar/ocultar cart
  let btn_cart = $("button[role=btn-cart]");

  btn_cart.on("click", mostrarCart);
  itemDelete();

  let btn_empty = $("button[role=btn-empty-cart]");
  btn_empty.on("click", empty_cart);
  preciosItems();

  $("input[data-counter]").each(function () {
    let id_item = $(this).closest("li").attr("id").replace("item-", "");
    contador(id_item);
  });
});
