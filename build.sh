rm -r dist | true
pushd frontend
yarn install
yarn build
mv ./dist ../
popd