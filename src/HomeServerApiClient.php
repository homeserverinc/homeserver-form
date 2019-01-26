<?php

namespace HomeServerInc\API;

use HomeServerInc\API\CurlResponse;

/**
 * Class to handle API Calls to HomeServer Inc.
 * 
 * @author Márcio Elias <marcioelias@gmail.com>
 * @version 1.0.0
 * @api https://homeserverinc.com/api
 */
class HomeServerApiClient {
    /**
     * Domain used to make API Calls
     *
     * @var string
     */
    protected $domain = 'https://homeserverinc.com';

    /**
     * Username used to access the API
     *
     * @var string
     */
    protected $user = '';

    /**
     * Password used to access the API
     *
     * @var string
     */
    protected $pass = '';

    /**
     * Token generated by the auth() method
     *
     * @var string
     */
    protected $token = '';

    /**
     * Token Type returned on the authentication process (in general Bearer)
     *
     * @var string
     */
    protected $tokenType = '';

    /**
     * Token Time To Live
     *
     * @var integer
     */
    protected $tokenTTL = 1800;

    /**
     * Method constructor, used to instantiate the object
     *
     * @param $user
     * @param $pass
     */
    public function __construct($user, $pass) {
        $this->user = $user;
        $this->pass = $pass;
        if (isset($_COOKIE['token_time'])) {
            $this->tokenTime = $_COOKIE['token_time'];
        }
    }

    /**
     * Initialize the cUrl resource
     *
     * @param $url
     * @param $method
     * @param Array $postFields
     * @param Array $httpHeader
     * @return resource 
     */
    protected function curlInit($url = '/', $method = 'POST', $postFields = [], $httpHeader = []) {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $this->domain.$url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "bearer",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_POSTFIELDS => http_build_query($postFields), 
            CURLOPT_HTTPHEADER => $httpHeader 
        ));

        return $curl;
    }

    /**
     * Undocumented function
     *
     * @param resource $curl
     * @return CurlResponse
     */
    protected function curlExec($curl) {
        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            return new CurlResponse(
                json_encode(
                    Array(
                        'error' => Array(
                            curl_error($curl)
                        ), 
                        'status' => 'error')
                    )
                );
        } else {
            return new CurlResponse($response);
        }
    }

    /**
     * Take the cUrl resourse, make the call and return a object with the response
     *
     * @param resource $curl
     * @return CurlResponse
     */
    public function getResponse($curl) {
        try {
            return $this->curlExec($curl);
        } catch (\Exception $e) {
            return new CurlResponse($e->getMessage, 'error');
        }
    }

    /**
     * Handle the authentication process
     *
     * @return bool
     */
    public function auth() {
        if (isset($_COOKIE['_HomeServerIncToken'])) {
            $this->token = $_COOKIE['_HomeServerIncToken'];
            $this->tokenType = $_COOKIE['_HomeServerIncTokenType'];
            return true;
        }
        $url = '/api/login';
        $method = 'POST';

        $postFields = array(
            'email' => $this->user,
            'password' => $this->pass
        );

        $httpHeader = array(
            'Accept: application/json',
            'Content-Type: application/x-www-form-urlencoded'
        );

        $curl = $this->curlInit($url, $method, $postFields, $httpHeader);

        $response = json_decode($this->getResponse($curl));

        if ($response->status == 'success') {
            $this->token = $response->data->access_token;
            $this->tokenType = $response->data->token_type;
            setcookie('_HomeServerIncToken', $this->token, time()+$this->tokenTTL);
            setcookie('_HomeServerIncTokenType', $this->tokenType, time()+$this->tokenTTL);
            return json_encode($response);
        } else {
            return json_encode($response);
        }
    }

    /**
     * Generate the default HTTP Header for authenticated requests
     *
     * @return Array
     */
    protected function getAuthenticatedHttpHeader() {
        return array (
            'Accept: application/json',
            'Authorization: '.$this->tokenType.' '.$this->token,
            'Content-Type: application/x-www-form-urlencoded'
        );
    }

    /**
     * Make authenticated requests to the API
     *
     * @param $url
     * @param $method
     * @param Array $postFields
     * @return CurlResponse
     */
    protected function authenticatedRequest($url, $method = 'POST', $postFields = []) {
        $res = json_decode($this->auth());
        if (isset($res->data->error)) {
            return json_encode($res);
        } else {
            return $this->getResponse(
                $this->curlInit(
                    $url, 
                    $method, 
                    $postFields, 
                    $this->getAuthenticatedHttpHeader()
                )
            );
        }
    }

    /**
     * Return data about logged user
     *
     * @return CurlResponse
     */
    public function me() {
        return $this->authenticatedRequest('/api/me');
    }

    /**
     * Refresh the current token
     *
     * @return CurlResponse
     */
    public function refresh() {
        return $this->authenticatedRequest('/api/refresh');
    }

    /**
     * Handle the Logout process of current authenticated user
     *
     * @return CurlResponse
     */
    public function logout() {
        return $this->authenticatedRequest('/api/logout');
    }

    /**
     * Make a call to get site info
     *
     * @param $uuid
     * @return CurlResponse
     */
    public function getSite($uuid) {
        return $this->authenticatedRequest('/api/site/'.$uuid, 'GET');
    }

    /**
     * Make a call to get all services from a given Category UUID
     *
     * @param $uuid
     * @return CurlResponse
     */
    public function getServices($uuid) {
        return $this->authenticatedRequest('/api/services/'.$uuid, 'GET');
    }

    /**
     * Get the info of a Service by the given ID
     *
     * @param Int $serviceId
     * @return CurlResponse
     */
    public function getService($serviceId) {
        return $this->authenticatedRequest('/api/service/'.$serviceId, 'GET');
    }

    public function getQuiz($uuid) {
        return $this->authenticatedRequest('/api/quiz/'.$uuid, 'GET');
    }

    /**
     * Get a Question and his Answers by the given ID
     *
     * @param Int $questionId
     * @return CurlResponse
     */
    public function getQuestion($questionId) {
        return $this->authenticatedRequest('/api/question/'.$questionId, 'GET');
    }

    /**
     * Post a new lead to the HomeServer System
     *
     * @return CurlResponse
     */
    public function setLead() {
        return $this->authenticatedRequest('/api/lead', 'POST', $_POST);
    }

    /**
     * Post a new contact request to the HomeServer System
     *
     * @return CurlResponse
     */
    public function setContact() {
        return $this->authenticatedRequest('/api/site_contact', 'POST', $_POST);
    }

    /**
     * Post a new contractor subscription request
     *
     * @return CurlResponse
     */
    public function setContractor() {
        return $this->authenticatedRequest('/api/contractor', 'POST', $_POST);
    }

}