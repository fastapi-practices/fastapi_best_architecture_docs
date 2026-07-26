---
title: JWT
---

We wrote a JWT authorization middleware so every request can be authorized automatically. User information is also cached and parsed with Redis and a Rust library to keep the performance impact as low as possible.

## API Authentication

The file `backend/common/security/jwt.py` includes the following code:

```python
# JWT dependency injection
DependsJwtAuth = Depends(HTTPBearer())
```

Add this dependency to an API function for quick JWT validation. It checks whether the request header contains a Bearer Token. Example:

```python{1}
@router.get('/hello', summary='你好', dependencies=[DependsJwtAuth])
async def hello():
    ...
```

## Token

The built-in token authorization follows [rfc6750](https://datatracker.ietf.org/doc/html/rfc6750).

## Swagger Login

This is a quick authorization method for debugging only. After the service starts, open the Swagger docs and use this debug endpoint to obtain a token quickly (no captcha required).

## Captcha Login

You can obtain a token this way. In most cases this is better suited for frontend login authorization.

In fba we use [fast_captcha](https://github.com/wu-clan/fast-captcha) to generate a base64 captcha, then return it via the API. You can convert base64 to an image online or use the frontend project to preview it as an image.

### Authorization Flow

```sequence Captcha login flow
actor Client
Client ->> Router: GET<br/>/api/v1/auth/captcha
Router ->> Rate limiter: Check request rate
Rate limiter -->> Router: Allowed
Router ->> fast_captcha: Generate random captcha
fast_captcha ->> Redis: Cache captcha
Client ->> Router: POST<br/>/api/v1/auth/login
Router ->> Rate limiter: Check request rate
Rate limiter -->> Router: Allowed
Router ->> Username: Check username exists in system
Username -->> Router: Passed
Router ->> Captcha: Validate captcha (cache and image content)
Captcha -->> Router: Passed
Router ->> Token: Generate Token
Token -->> Client: Success
```
