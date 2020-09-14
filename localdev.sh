sed -i '' s/mongo:/localhost:/g ./acme-api/src/db/conf.js ./broker-api/src/db/conf.js
sed -i '' s/broker-api:/localhost:/g acme-api/src/services/api.js
