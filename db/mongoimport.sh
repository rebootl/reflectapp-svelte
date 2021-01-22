APP="reflectapp"
COLLECTIONS=( "users" )

for c in "${COLLECTIONS[@]}"; do
  mongoimport --db "$APP" \
    --collection "$c" \
    --jsonArray \
    --file "/docker-entrypoint-initdb.d/${c}.json"
done
