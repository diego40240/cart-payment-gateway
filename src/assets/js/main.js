let form_add_cart = $("form[role=form-card]");

form_add_cart.on("submit", function (event) {
  event.preventDefault();
  let formdata = new FormData();
  formdata.append("btnPosicion", $(this).attr("data-card-producto"));
  formdata.append("dataImg", $(this).find("[data-card-img]").data("card-img"));
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
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
