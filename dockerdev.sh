sed -i '' s/localhost:/mongo:/g ./acme-api/src/db/conf.js ./broker-api/src/db/conf.js
sed -i '' s/localhost:/broker-api:/g acme-api/src/services/api.js
