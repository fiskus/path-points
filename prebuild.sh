rm -r dist
git checkout gh-pages
git merge master
gulp build
git add dist
