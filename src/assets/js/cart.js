$(document).ready(function () {
  let btn_cart = $("button[role=btn-cart]");

  btn_cart.on("click", function () {
    let cart = $("div[role=cart]");

    cart.toggleClass("-translate-y-full");

    if (cart.hasClass("-translate-y-full")) {
      $("button[role=btn-cart] svg").attr("aria-hidden", true);
    } else {
      $("button[role=btn-cart] svg").attr("aria-hidden", false);
    }
  });

  let btn_delete = $("button[role=btn-delete-item]");

  btn_delete.on("click", function () {
    let data_delete = $(this).data("delete");
    console.log(data_delete);
  });
});
