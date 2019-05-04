#!/bin/bash -e

ORG="@warriortrading"
PKG="ng-golden-layout"

echo "This scripts builds the projects."
echo "Building $ORG/$PKG"
ng build ng-golden-layout
echo "Copying readme"
cp README.md dist/$ORG/$PKG
echo "Repacking lib"
(cd dist/$ORG/$PKG && tar czvf ../$PKG.tgz *)

echo "Linking $ORG/$PKG"
rm -f node_modules/$ORG/$PKG
mkdir -p node_modules/$ORG
ln -s ../../dist/$ORG/$PKG node_modules/$ORG/$PKG

echo "Building testbed"
ng build testbed
