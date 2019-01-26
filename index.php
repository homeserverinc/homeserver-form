<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Home Server Form</title>

        <link rel="stylesheet" href="public/css/app.css">
    </head>
    <body>

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

    </body>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXEKDJ6apFhd92r8DaBoNuFru26-8aR_I&libraries=places"></script>
</html>