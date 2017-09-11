#!/usr/bin/env bash

cd $(dirname $0)/..
set -x

set -e
npm run build
set +e

# GITHUB publish

BRANCH_NAME=$(git name-rev --name-only HEAD)

# If publish from muster - deliver to github, else move localy to webapp/node_modules
if [[ $BRANCH_NAME == "master" ]]; then
    VER_TO_PUBLISH=$(git rev-list HEAD --count)

    TAG_NAME=v$VER_TO_PUBLISH

    BUILD_BRANCH=custom-build

    # check if tag exists
    git ls-remote --tags 2>/dev/null | grep $TAG_NAME 1>/dev/null
    if [ "$?" == 0 ]; then
        echo "Git tag $TAG_NAME exists."
    else
        set -e
        git branch -D $BUILD_BRANCH || true
        git checkout --orphan $BUILD_BRANCH

        # cleanup files and release to github
        rm -rf .storybook examples scripts 	src stories test webpack .babelrc .eslintignore .eslintrc .gitattributes .travis.yml yarn.lock
        touch .npmignore
        git add .
        # add gitignored
        git add lib --force
        git commit -m "Release $TAG_NAME"
        git tag -a $TAG_NAME -m "Release $TAG_NAME"
        git push origin $TAG_NAME
        git checkout $BRANCH_NAME
        set +e

		set -e
		npm run build
        set +e
    fi
else
    webapp_relative_dir=../hitask-webapp # name of webapp project folder relatifely to blueprint

    DIST=$webapp_relative_dir/react/node_modules/react-big-calendar
	rsync -av --progress ./lib $DIST
fi
