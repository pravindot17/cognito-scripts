

https://idfs-demo-app.auth.ap-south-1.amazoncognito.com/authorize?idp_identifier=b2x_idp_provider&response_type=token&client_id=7hbu7opkgev1o9i77v2urrg346&redirect_uri=http://localhost:3000



https://idfs-demo-app.auth.ap-south-1.amazoncognito.com/login?response_type=token&client_id=7hbu7opkgev1o9i77v2urrg346&redirect_uri=http://localhost:3000

https://idfs-demo-app.auth.ap-south-1.amazoncognito.com/login?response_type=token&client_id=7hbu7opkgev1o9i77v2urrg346&redirect_uri=http://localhost:3000

https://idfs-demo-app.auth.ap-south-1.amazoncognito.com/login?response_type=code&client_id=7hbu7opkgev1o9i77v2urrg346&redirect_uri=http://localhost:3000


cognito-idp.ap-south-1.amazonaws.com

-- Auth code
-- c992e6d6-8ee2-4564-914e-1507bdf8d9c9

https://kunaldemo.auth.ap-south-1.amazoncognito.com/login?response_type=token&client_id=757lu0jqjjulpmntrkl9n5sh9u&redirect_uri=http://localhost:3000

aws cognito-idp admin-initiate-auth --user-pool-id ap-south-1_cUuQOCPE6 --client-id 757lu0jqjjulpmntrkl9n5sh9u --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME=pravin,PASSWORD=123123123


-- Keycloak

-- To run using docker
docker run --name keycloak -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin  -p 8443:8443 -p 8080:8080 jboss/keycloak

-- realm configuration
http://localhost:8080/auth/realms/demo/.well-known/openid-configuration

http://localhost:8080/auth/realms/demo/protocol/openid-connect/auth?client_id=payment-api&response_type=token
-- also enable impicit flow

-- will recieve after login
http://localhost:3000/#session_state=39af6ca4-f40e-4d60-8664-95d1c59205e7&access_token=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpY0Z6MGhaVFBVVlVROExRdU0xLWZaMlZYV1AtbmYyeDNXZDJ3MW5RLWlnIn0.eyJqdGkiOiIzNjMwM2NkNy0xMWZkLTQ2MzAtOGM1My0zZjM5ODcwODQzMDQiLCJleHAiOjE1NjcxNDA0MTYsIm5iZiI6MCwiaWF0IjoxNTY3MTM5NTE2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvZGVtbyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1MGI3ZjRjZi00Njk5LTQ3MTEtYWUxZS0yMTkyMDQ0MTM4NWEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJwYXltZW50LWFwaSIsImF1dGhfdGltZSI6MTU2NzEzOTUxNiwic2Vzc2lvbl9zdGF0ZSI6IjM5YWY2Y2E0LWY0MGUtNGQ2MC04NjY0LTk1ZDFjNTkyMDVlNyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiUHJhdmluIExvbGFnZSIsInByZWZlcnJlZF91c2VybmFtZSI6InByYXZpbiIsImdpdmVuX25hbWUiOiJQcmF2aW4iLCJmYW1pbHlfbmFtZSI6IkxvbGFnZSIsImVtYWlsIjoicHJhdmluQGIyeC5jb20ifQ.L2-ezeDQMgDPdVAbgirkuXmxehA0nllvRFy3U5u3KzoNTygZobO5tdSxmNYXwmwY7ssbuo3H-E0FuCWz7UHQl6TRalS5GqKIbuEesJHvew2zG-n9NQNK_X-i1bVFqbUGvT3n2qeEIkpIWuAo50H3lYv9iMmSdKDqf7IbBSw9y0LkUHYgJAPrZWSrv7z3wIFAblsK2e2bECdgeQeins94AiCzoVaJbzSSjMu8GPeqhW_QcRZU5ZwLSBm_EABFELNw47vpTgQBgjrGUnxqN7mzSUadwdWeVgsc6MOYbVFJnKXwEKHWvaziY8pLubC1qoZmqjuvWmGEWyG_lpVQI6rTVg&token_type=bearer&expires_in=900


-- using rest api login to realm
http://localhost:8080/auth/realms/demo/protocol/openid-connect/token

-- should be form-encoded-data
{
  "client_id": "payment-api",
  "username": "pravin",
  "password": "123123123",
  "grant_type": "password"
  -- to get id_token add following params
  "scope": "openid",
  "response_type": "id_token"
}

