<div role="cart"
    class="absolute -z-10 top-0 right-0 w-full max-w-md p-4 bg-white border border-gray-200 rounded-b-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 -translate-y-full duration-300 ease-linear">
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Cart</h5>
        <a href="#" class="text-sm font-medium text-red-600 hover:underline dark:text-red-500">
            Empty cart
        </a>
    </div>
    <div class="flow-root">
        <?php if (isset($_SESSION["lista_cart"]) && count($_SESSION["lista_cart"]) != 0) { ?>


        <ul role="list" data-empty-cart="false" class="divide-y divide-gray-200 dark:divide-gray-700">
            <?php foreach ($lista_cart as $key => $items) {
                    $itemImg = $items[0];
                    $itemTitle = $items[1];
                    $itemPrecio = $items[2];
                ?>
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8" src="<?php echo $itemImg ?>" alt="Neil image">
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="mb-2 text-sm font-medium text-gray-900 truncate dark:text-white">
                            <?php echo $itemTitle ?>
                        </p>
                        <?php include "button-counter.php" ?>
                    </div>
                    <div
                        class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white py-2 px-5">
                        <?php echo $itemPrecio ?>
                    </div>
                    <button class="border-x-gray-300 border-l-2 py-2 px-5" role="btn-delete-item"
                        data-delete="<?php echo $key ?>">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                            <path
                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                    </button>
                </div>
            </li>
            <?php } ?>

        </ul>
        <?php  } else { ?>
        <ul role="list" data-empty-cart="true" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
                <div class="flex justify-center items-center text-base font-medium">Empty cart</div>
            </li>
        </ul>
        <?php } ?>
    </div>
</div>