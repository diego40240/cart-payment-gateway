<?php
$lista_products = array("1598" => ["Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport", "5.0", "$599", "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/FKMY3_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1647901077187"], "1564" => ["Reloj Casio Unisex LQ-139L-6B Blanco", "4.0", "$99", "https://oechsle.vteximg.com.br/arquivos/ids/15225134-1500-1500/2403641.jpg?v=638277529836000000"]);

foreach ($lista_products as $posicion => $producto) {
    $titulo = $producto[0];
    $estrellas = $producto[1];
    $precio = $producto[2];
    $img = $producto[3];
?>
<form method="POST" action="src/controller/cart.php" role="form-card" data-card-producto="<?php echo $posicion ?>">
    <div
        class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#" data-card-img="<?php echo $img ?>">
            <img class="p-8 rounded-t-lg" src="<?php echo $img ?>" alt="product image" />
        </a>
        <div class="px-5 pb-5">
            <a href="#">
                <h5 title="<?php echo $titulo ?>"
                    class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white h-14 text-ellipsis line-clamp-2"
                    data-card-title="<?php echo $titulo ?>">
                    <?php echo $titulo ?>
                </h5>
            </a>
            <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    <?php for ($i = 1; $i <= 5; $i++) {
                            if ($i <= $estrellas) { ?>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <?php } else { ?>
                    <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <?php }
                        } ?>


                </div>
                <span
                    class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"><?php echo $estrellas ?></span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white"
                    data-card-precio="<?php echo $precio ?>"><?php echo $precio ?></span>
                <button type="submit" role="btn-add-cart" data-btn-posicion-producto="<?php echo $posicion ?>"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Agregar al carrito</button>
            </div>
        </div>
    </div>
</form>
<?php } ?>