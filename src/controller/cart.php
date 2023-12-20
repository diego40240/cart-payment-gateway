<?php
session_start();

if (isset($_SESSION["lista_cart"]) && count($_SESSION["lista_cart"]) != 0) {
    $lista_cart = $_SESSION["lista_cart"];
    $count_cart = count($lista_cart);
} else {
    $count_cart = 0;
}

//Agregar items al carrito
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
                $newItem = array($btnPosicion => [$img, $title, $precio]);
                echo json_encode($newItem);
            } else {
                $existe = true;
                echo json_encode("duplicado");
            }
        } else {
            $lista_cart = $_SESSION["lista_cart"] = array($btnPosicion => [$img, $title, $precio]);
            $count_cart = count($lista_cart);
            echo json_encode($lista_cart);
        }
    }
}

//Eliminar item carrito
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data_delete = json_decode($_GET['data_delete'], true);
    $lista_cart = $_SESSION["lista_cart"];
    unset($lista_cart[$data_delete]);
    $_SESSION["lista_cart"] = $lista_cart;
    echo json_encode("Item eliminado");
}
