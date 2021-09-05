rm -r dist | true
cd frontend
npm install
npm run build
mv ./dist ../