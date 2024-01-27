<?php
$account_pe = $_POST["account_pe"];
$referenceCode = $_POST["referenceCode"];
$signature = $_POST["signature"];
$description = $_POST["description"];
$tx_value_pe = $_POST["tx_value_pe"];
$currency_pe = $_POST["currency_pe"];
// Datos de la solicitud
$requestData = [
    "test" => true,
    "language" => "es",
    "command" => "SUBMIT_TRANSACTION",
    "merchant" => [
        "apiLogin" => "pRRXKOl8ikMmt9u",
        "apiKey" => "4Vj8eK4rloUd272L48hsrarnUA"
    ],
    "transaction" => [
        "order" => [
            "accountId" => "$account_pe",
            "referenceCode" => "$referenceCode",
            "description" => "$description",
            "language" => "es",
            "signature" => "$signature",
            // "notifyUrl" => "{{confirmation_page}}",
            "additionalValues" => [
                "TX_VALUE" => [
                    "value" => "$tx_value_pe",
                    "currency" => "$currency_pe"
                ]
            ],
            "buyer" => [
                // "merchantBuyerId" => "1",
                "fullName" => "First name and second buyer name",
                "emailAddress" => "buyer_test@test.com",
                "contactPhone" => "7563126",
                "dniNumber" => "123456789",
                "shippingAddress" => [
                    "street1" => "Av. Isabel La Católica 103-La Victoria",
                    "street2" => "5555487",
                    "city" => "Lima",
                    "state" => "Lima y Callao",
                    "country" => "PE",
                    "postalCode" => "000000",
                    "phone" => "7563126"
                ]
            ],
            // "shippingAddress" => [
            //     "street1" => "Av. Isabel La Católica 103-La Victoria",
            //     "street2" => "5555487",
            //     "city" => "Lima",
            //     "state" => "Lima y Callao",
            //     "country" => "PE",
            //     "postalCode" => "0000000",
            //     "phone" => "7563126"
            // ]
        ],
        "payer" => [
            "merchantPayerId" => "1",
            "fullName" => "First name and second payer name",
            "emailAddress" => "buyer_test@hotmail.com",
            "contactPhone" => "7563126",
            "dniNumber" => "5415668464654",
            "billingAddress" => [
                "street1" => "Av. Isabel La Católica 103-La Victoria",
                "street2" => "125544",
                "city" => "Lima",
                "state" => "Lima y Callao",
                "country" => "PE",
                "postalCode" => "000000",
                "phone" => "7563126"
            ]
        ],
        "creditCard" => [
            "number" => "4097440000000004",
            "securityCode" => "321",
            "expirationDate" => "2025/12",
            "name" => "APPROVED"
        ],
        "extraParameters" => [
            "INSTALLMENTS_NUMBER" => 1
        ],
        "type" => "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod" => "VISA",
        "paymentCountry" => "PE",
        "deviceSessionId" => "vghs6tvkcle931686k1900o6e1",
        "ipAddress" => "127.0.0.1",
        "cookie" => "pt1t38347bs6jc9ruv2ecpv7o2",
        "userAgent" => "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
    ],
];

// Convertir los datos a formato JSON
$requestJson = json_encode($requestData);

// URL de la API de PayU
$url = 'https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi';

// Inicializar la solicitud cURL
$curl = curl_init($url);

// Configurar la solicitud cURL
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($curl, CURLOPT_POSTFIELDS, $requestJson);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // Esta línea indica a cURL que devuelva el resultado de la solicitud en lugar de imprimirlo
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    "Host: sandbox.api.payulatam.com",
    "Content-Type: application/json",
    "Accept: application/json",
    'Content-Length:' . strlen($requestJson)
]);

// Ejecutar la solicitud cURL y obtener la respuesta
$response = curl_exec($curl);

// Verificar si hay errores
if ($response === false) {
    $error = curl_error($curl);
    echo 'Error en la solicitud cURL: ' . $error;
} else {
    // Procesar la respuesta
    // $decodedResponse = json_decode($response, true);
    // Aquí puedes manejar la respuesta obtenida de la API de PayU según tus necesidades
    // var_dump($response);
    echo $response;
}

// Cerrar la solicitud cURL
curl_close($curl);
