<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="src/assets/css/output.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
    <title>Document</title>
</head>
<?php include("src/controller/cart.php"); ?>

<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <?php include "src/components/navbar.php" ?>
    <main class="min-h-full h-screen flex flex-wrap justify-center items-center gap-5 ">
        <?php include "src/components/product-card.php" ?>
        <?php include "src/components/modal-payU.php" ?>
    </main>



    <script src="src/assets/js/main.js"></script>
</body>

</html>

<script>
// $("button[role=btn-pagar]").on("click", function() {
//     fetch("src/controller/controllerPayU/cobrarPayU.php")
//         .then(response => response.json())
//         .then(data => {
//             // Manejar la respuesta de la API aquí
//             data["paymentMethods"].forEach(tarjeta => {
//                 if (tarjeta["country"] == "PE") {

//                     console.log(tarjeta["description"]);
//                 }
//             });
//             console.log(data);
//         })
//         .catch(error => {
//             // Manejar errores de la solicitud
//             console.error('Error:', error);
//         });
// })
</script>