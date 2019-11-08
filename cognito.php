<?php
$url = 'https://idfs-demo-app.auth.ap-south-1.amazoncognito.com/login?response_type=code&client_id=7hbu7opkgev1o9i77v2urrg346&redirect_uri=http://localhost:3000';
$client_key = '7hbu7opkgev1o9i77v2urrg346';
$username = 'jatin@b2x.com';
$password = '123123123';

$data = ['response_type' => 'token',
        'client_id'=>$client_key,
        'redirect_uri'=>'http://localhost:3000'];

$handle = curl_init($url);
curl_setopt($handle, CURLOPT_VERBOSE, true);
curl_setopt($handle, CURLOPT_FOLLOWLOCATION, true);
// curl_setopt($handle, CURLOPT_USERPWD, $username . ":" . $password);
curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
$field_string = http_build_query($data);
// curl_setopt($handle, CURLOPT_POSTFIELDS, $field_string);
$resp = json_decode(curl_exec($handle),true);

echo '<pre>';
print_r($resp);
echo '</pre>';
?>
