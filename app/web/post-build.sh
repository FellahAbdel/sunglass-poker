# post-build.sh
find build -name '*.html' -exec sed -i 's/\/static/static/g' {} +
find build -name '*.js' -exec sed -i 's/\/static/static/g' {} +
find build -name '*.css' -exec sed -i 's/\/static/static/g' {} +
