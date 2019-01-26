<?php

require_once 'vendor/autoload.php';

use HomeServerInc\API\HomeServerApiClient;


$request = explode('/', $_SERVER['REQUEST_URI']);

$url = $request[1];
$param = isset($request[2]) ? $request[2] : null;


$apiClient = new HomeServerApiClient('superadministrator@app.com', 'password');
//if ($apiClient->auth()) {
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
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $res = $apiClient->setContact($param);   
                switch ($res->status) {
                    case 'fail':
                        $old = $res->data->old;
                        $errors = $res->data->errors;
                        break;
                    
                    case 'error':
                        $old = $res->data->old;
                        $errors = ['message' => 'Oops an error ocour...'];
                        break;

                    default:
                        $success = 'Thank your for contact us. We will return as soon as possible!';
                        break;
                }
            }
            include('contact.php');
            break;

        case 'submit-lead':
            echo $apiClient->setLead($param);
            break;

        case 'teste':
            include('mockup.php');
            break;

        default:  
            include('home.php');
            break;
    }
//}
?>