<?php

/*
 *
 * Settings file:
 * This is the file config.php, containing the configuration of the API.
 *
 * appKey: The client identification of your app, supplied by Saxo (Client ID)
 * clientSecret: The secret which gives access to the API (Client Secret)
 * tokenEndpoint: The URL of the authentication provider (https://www.developer.saxo/openapi/learn/environments)
 *
 */

// Configuration for SIM:
$configuration = json_decode('{
    "appKey": "faf2acbb48754413a043676b9c2c2bd5",
    "appSecret": "c074e19278f74700b21d66287a30c14e",
    "tokenEndpoint": "https://sim.logonvalidation.net/token"
}');
