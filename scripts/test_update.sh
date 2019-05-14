ID=$1
curl -d '{"name": "'$2'"}' -H "Content-Type: application/json" -X PUT "https://lambda-school-2-zoverlvx.c9users.io/api/zoos/$ID"
