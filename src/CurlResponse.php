<?php

namespace HomeServerInc\API;

/**
 * Class to handle cUrl responses
 * 
 * @author Márcio Elias <marcioelias@gmail.com>
 * @version 1.0.0
 */
class CurlResponse {
    /**
     * Hold a data object from cUrl calls
     *
     * @var array
     */
    public $data = false;

    /**
     * Hold the status of the call, where:
     * success -> all ok
     * fail -> validation erros
     * error -> exceptions and other errors
     *
     * @var string
     */
    public $status = 'success';

    /**
     * Method constructor
     *
     * @param Array $data
     * @param String $errorMsg
     */
    public function __construct($response) {
        $response = json_decode($response);
        $this->data = isset($response->data) ? $response->data : $response;
        $this->status = isset($response->status) ? $response->status : 'success';
    }

    /**
     * Return the JSON representation of him self
     *
     * @return string
     */
    public function __toString() {
        //header('Content-type: application/json');
        return json_encode($this);
    }
}
