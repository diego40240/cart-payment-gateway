$(document).ready(function () {
  function HTML_ITEM_CART(key, item) {
    return `<li id="item-${key}" class="py-3 sm:py-4 duration-300 -translate-y-full">
  <div class="flex items-center">
      <div class="flex-shrink-0">
          <img class="w-8 h-8" src="${item[0]}" alt="Neil image">
      </div>
      <div class="flex-1 min-w-0 ms-4">
          <p role="title-item" class="mb-2 text-sm font-medium text-gray-900 truncate dark:text-white">
          ${item[1]}
          </p>
          <form class="max-w-xs mx-auto h-fit">
            <div class="relative flex items-center max-w-[8rem]">
            <button type="button" data-decrement
            class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-9 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 1h16" />
            </svg>
        </button>
        <input type="text" data-counter aria-describedby="helper-text-explanation"
            class="bg-gray-50 border-x-0 border-gray-300 h-9 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="999" value="1" required>
        <button type="button" data-increment
            class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-9 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 1v16M1 9h16" />
            </svg>
        </button>
            </div>
        </form>
      </div>
      <div role="precio-item"
          class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white py-2 px-5">
          ${item[2]}
      </div>
      <button class="border-x-gray-300 border-l-2 py-2 px-5" role="btn-delete-item"
          data-delete="${key}">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
              <path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
      </button>
  </div>
</li>`;
  }

  function HTML_BTN_PAY() {
    return `<button
      role="modal"
      data-modal-target="crud-modal"
      data-modal-toggle="crud-modal"
      class="block w-full py-2 px-5 text-sm font-medium bg-green-600 hover:opacity-95 text-white hover:underline dark:text-white dark:bg-green-500"
    >
      Pagar
    </button>`;
  }

  //Boton add cart
  let form_add_cart = $("form[role=form-card]");

  form_add_cart.on("submit", function (event) {
    event.preventDefault();
    let formdata = new FormData();
    formdata.append("btnPosicion", $(this).attr("data-card-producto"));
    formdata.append(
      "dataImg",
      $(this).find("[data-card-img]").data("card-img")
    );
    formdata.append(
      "dataTitle",
      $(this).find("[data-card-title]").data("card-title")
    );
    formdata.append(
      "dataPrecio",
      $(this).find("[data-card-precio]").data("card-precio")
    );

    fetch("src/controller/cart.php", {
      method: "POST",
      body: formdata,
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw "Error en llamada";
        }
      })
      .then(function (lista_cart) {
        //CREA ITEM CARRO VACIO
        if ($("ul[role=list]").attr("data-empty-cart") == "true") {
          mostrarCart();
          $("ul[role=list]").attr("data-empty-cart", false);

          Object.entries(lista_cart).forEach(([key, item]) => {
            $("ul[role=list]").html(HTML_ITEM_CART(key, item));
            // console.log(key);
            contador(key);
          });
          $("ul[role=list]").after(HTML_BTN_PAY());
          btnPagar();
          preciosItems();
          // contador();
          itemDelete();

          $("div[role=counter-cart]").text(1);
          setTimeout(() => {
            if ($("ul[role=list] li").first().hasClass("-translate-y-full")) {
              $("ul[role=list] li").first().removeClass("-translate-y-full");
            }
          }, 100);
        }
        //------FIN CREADO DE ITEM CARRO VACIO

        //CREA ITEM CARRO > 0
        else {
          if (lista_cart != "duplicado") {
            Object.entries(lista_cart).forEach(([key, item]) => {
              // console.log(key);
              $("ul[role=list]").prepend(HTML_ITEM_CART(key, item));
              contador(key);
            });
            // contador();
            itemDelete();

            $("div[role=counter-cart]").text(
              $("ul[role=list]").find("li").length
            );
            if ($("button[role=btn-cart] svg").attr("aria-hidden") == "true") {
              mostrarCart();
            }
            setTimeout(() => {
              if ($("ul[role=list] li").first().hasClass("-translate-y-full")) {
                $("ul[role=list] li").first().removeClass("-translate-y-full");
              }
            }, 100);
          }
        }

        //------FIN CREADO DE ITEM CARRO > 0
      })
      .catch((error) => console.log(error));
  });
});
