#! /bin/bash

# variables
Path="src/Pages"

# get names of files in path

for entry in "$Path"/*; do
    echo "$entry"

    # create a folder for each file and remove .js extension
    mkdir -p "$Path/$(basename "$entry" .tsx)"
    mv "$entry" "$Path/$(basename "$entry" .tsx)/index.tsx"

done
