#! /bin/bash

# variables
Path="src/Components"

# Take User Input for Creating Component or deleting Component
echo "Enter 1 to create Component"
echo "Enter 2 to delete Component"
read choice

Rfce() {
    # Write the Component Name
    echo "import React from 'react';" >>$Path/$1.tsx
    echo "import './$1.scss';" >>$Path/$1.tsx
    echo "function $1() {" >>$Path/$1.tsx
    echo "    return ( " >>$Path/$1.tsx
    echo "        <div>" >>$Path/$1.tsx
    echo "           $1" >>$Path/$1.tsx
    echo "        </div>" >>$Path/$1.tsx
    echo "    )" >>$Path/$1.tsx
    echo "}" >>$Path/$1.tsx
    echo "export default $1" >>$Path/$1.tsx
}

Test() {
    # Test Boilerplate
    echo "import React from 'react';" >>$Path/__tests__/$1.test.tsx
    echo "import $1 from './$1';" >>$Path/__tests__/$1.test.tsx
    echo "import { render, fireEvent, screen } from '@testing-library/react';" >>$Path/__tests__/$1.test.tsx
    echo "import '@testing-library/jest-dom/extend-expect';" >>$Path/__tests__/$1.test.tsx
    echo "describe('$1', () => {" >>$Path/__tests__/$1.test.tsx
    echo "    it('should render without crashing', () => {" >>$Path/__tests__/$1.test.tsx
    echo "        const div = document.createElement('div');" >>$Path/__tests__/$1.test.tsx
    echo "        render(<$1 />, div);" >>$Path/__tests__/$1.test.tsx
    echo "    });" >>$Path/__tests__/$1.test.tsx
    echo "});" >>$Path/$1.test.tsx
}

# if user input is 1 then create component

if [ "$choice" -eq 1 ]; then
    echo "Creating Component"
    read -p "Enter Component Name: " NAME

    if [ -z "$NAME" ]; then
        echo "You did not Component Name"
    else
        # get Path of directory
        DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
        # get name of directory
        DIR_NAME=$(basename "$DIR")

        echo "Component Name: $NAME"

        # check if directory exists
        DIRECTORY='/home/data'
        if [ ! -d "$Path/$NAME" ]; then

            touch $Path/$NAME.tsx
            touch $Path/StyledComponents/$NAME.ts
            touch $Path/__tests__/$NAME.test.tsx

            # Write in Component Files
            Rfce $NAME
            Test $NAME

            echo "Component Created"
        else
            echo "Component Already Exists"
        fi

    fi

else

    echo "Deleting Component"
    read -p "Enter Component Name: " NAME
    rm -rf $Path/$NAME.tsx
    rm -rf $Path/StyledComponents/$NAME.ts
    rm -rf $Path/__tests__/$NAME.test.tsx
fi
