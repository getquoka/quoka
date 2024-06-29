# Quoka

Quoka aims to provide the best data analysis experience for small teams with small or medium-sized data. Period.

## How does Quoka provide the best experience?

## Generate secret keys

```
openssl ecparam -name secp521r1 -genkey | openssl pkcs8 -topk8 -nocrypt -out private_key.pem
openssl ec -in private_key.pem -pubout -out public_key.pem
echo "AUTH_JWT_KEY=\"`sed -E 's/$/\\\n/g' public_key.pem`\"" >> .env
```
