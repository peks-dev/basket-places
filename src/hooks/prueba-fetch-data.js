var req = unirest(
  "GET",
  "https://www.universal-tutorial.com/api/getaccesstoken"
);

req.headers({
  Accept: "application/json",
  "api-token":
    "AuXnFjES43NqbdODZoc1anLtpO9op_9HsA7hqU56HJoxlbbNrMsUAzmsp6cqoZ0HhWQ",
  "user-email": "abc@gmail.com",
});
