rm -r dist | true
pushd frontend
npm install
npm run build
mv ./dist ../
pop