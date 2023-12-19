<?php
session_start();

if (isset($_SESSION["lista_cart"]) && count($_SESSION["lista_cart"]) != 0) {
    $lista_cart = $_SESSION["lista_cart"];
    $count_cart = count($lista_cart);
} else {
    $count_cart = 0;
}

//Agregar items al carrito
if (isset($_POST["dataImg"]) && isset($_POST["dataTitle"]) && isset($_POST["dataPrecio"])) {
    $btnPosicion = $_POST["btnPosicion"];
    $img = $_POST["dataImg"];
    $title = $_POST["dataTitle"];
    $precio = $_POST["dataPrecio"];
    if (isset($_SESSION["lista_cart"]) && count($_SESSION["lista_cart"]) != 0) {
        $lista_cart = $_SESSION["lista_cart"];
        if (!array_key_exists($btnPosicion, $lista_cart)) {
            $lista_cart[$btnPosicion] = [$img, $title, $precio];
            $lista_cart = array_reverse($lista_cart, true);
            $_SESSION["lista_cart"] = $lista_cart;
            $count_cart = count($lista_cart);
        }

        echo json_encode($lista_cart);
    } else {
        $lista_cart = $_SESSION["lista_cart"] = array($btnPosicion => [$img, $title, $precio]);
        $count_cart = count($lista_cart);
        echo json_encode($lista_cart);
    }
}