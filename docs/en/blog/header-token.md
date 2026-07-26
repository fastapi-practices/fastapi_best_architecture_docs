---
title: How to Authorize with a Custom Header Token in FastAPI
createTime: 2025-03-09 18:00
tags:
  - FastAPI
permalink: /blog/u8tvb5fb/
---

In FastAPI's advanced security tutorials, two authorization approaches are introduced: OAuth2 scopes and HTTP Basic Auth. Both support Swagger documentation authorization and quick login-based auth in the docs UI.

Both can do in-docs quick verification, but they use form login, which is not ideal for us. In fba we use HTTPBearer instead. It is less convenient than the other two, but still supports automatic docs authorization: call the login API first to get a token, then fill it in.

## Why Bearer Token?

In practice, many systems do not use bearer token. Many still use tokens for auth, but schemes vary widely. So why bearer token? There is no special reason — it is simply a standard approach. See: [Authentication Schemes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes).

Common API tools such as Postman and APIfox also implement the bearer standard for easy automatic authorization. Follow their official tutorials.

## Custom Token Authorization

Back to the point: how to use a non-bearer approach and set a custom request header for authorization (as a side note — for the backend it does not really matter how it is done; if the frontend insists on a custom scheme purely for convenience, that is their choice; if a tech spec requires it, discuss further).

First, open `backend/common/security/jwt.py`, find `DependsJwtAuth = Depends(HTTPBearer())`, and replace `HTTPBearer()` with `APIKeyHeader(name='xxx')`, where `name` is your custom header key. Because we previously used bearer, also update `get_token()` in the same file:

```python
def get_token(request: Request) -> str:
    authorization = request.headers.get('xxx')  # name
    if not authorization:
        raise TokenError(msg='Invalid Token')
    return token
```

Update the JWT middleware as follows:

```python
# Remove the following code
scheme, token = get_authorization_scheme_param(token)
if scheme.lower() != 'bearer':
    return
```

That completes custom token authorization. In the docs, you still log in first to get a token, then fill it in.

With this approach, API tools require manually adding the token to headers — automatic authorization is harder. Personally we still recommend the standard approach.
