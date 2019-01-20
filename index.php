<?php

require_once 'vendor/autoload.php';

use HomeServerInc\API\HomeServerApiClient;


$request = explode('/', $_SERVER['REQUEST_URI']);

$url = $request[1];
$param = isset($request[2]) ? $request[2] : null;


$apiClient = new HomeServerApiClient('superadministrator@app.com', 'password');
if ($apiClient->auth()) {
    switch ($url) {
        case 'service':
            echo $apiClient->getService($param);
            break;

        case 'services':
            echo $apiClient->getServices($param);
            break;       

        case 'question':
            echo $apiClient->getQuestion($param);
            break;

        case 'site':
            echo $apiClient->getSite($param);
            break;
            
        case 'quiz':
            echo $apiClient->getQuiz($param);
            break;
        
        case 'contact':
            include('contact.php');
            break;

        case 'contact_post':
            echo $apiClient->setContact($param);
            break;

        case 'teste':
            include('mockup.php');
            break;

        default:  
            include('home.php');
            break;
    }
}
?>