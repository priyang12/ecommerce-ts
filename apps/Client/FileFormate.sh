#! /bin/bash

# variables
Path="src/Pages"

# get names of files in path

for entry in "$Path"/*; do
    echo "$entry"

    # loop through folder and move index.tsx to foldername.tsx
    if [ -d "$entry" ]; then
        echo "$entry is a directory"
        for file in "$entry"/*; do
            echo "$file"
            if [ "$file" == "$entry/index.tsx" ]; then
                echo "found index.tsx"
                # get folder name
                folderName=$(basename "$entry")
                touch "$entry/$folderName.tsx"
                mv "$entry/index.tsx" "$entry/$folderName.tsx"
                touch "$entry/index.tsx"
                # add export to index.tsx
                echo "export { default } from './$folderName';" >> "$entry/index.tsx"

            fi
        done
    fi    

done

