#!/bin/bash

# variables
Path="src/Components"

# Take User Input for Creating Component or deleting Component
echo "Enter 1 to create Component"
echo "Enter 2 to delete Component"
read choice

Rfce() {
    # Write the Component Name
    echo "import React from 'react';" > $Path/$1/$1.tsx
    echo "import { Styled$1 } from './Styled$1';" >> $Path/$1/$1.tsx
    echo "" >> $Path/$1/$1.tsx
    echo "interface ${1}Props {}" >> $Path/$1/$1.tsx
    echo "" >> $Path/$1/$1.tsx
    echo "function $1({}: ${1}Props) {" >> $Path/$1/$1.tsx
    echo "    return (" >> $Path/$1/$1.tsx
    echo "        <Styled$1>" >> $Path/$1/$1.tsx
    echo "            $1 Component" >> $Path/$1/$1.tsx
    echo "        </Styled$1>" >> $Path/$1/$1.tsx
    echo "    );" >> $Path/$1/$1.tsx
    echo "}" >> $Path/$1/$1.tsx
    echo "" >> $Path/$1/$1.tsx
    echo "export default $1;" >> $Path/$1/$1.tsx
}

StyledComponent() {
    # Write the Styled Component
    echo "import styled from 'styled-components';" > $Path/$1/Styled$1.ts
    echo "" >> $Path/$1/Styled$1.ts
    echo "export const Styled$1 = styled.div\`" >> $Path/$1/Styled$1.ts
    echo "    // Your styles here" >> $Path/$1/Styled$1.ts
    echo "\`;" >> $Path/$1/Styled$1.ts
}

IndexFile() {
    # Write the index.ts file
    echo "export { default } from './$1';" > $Path/$1/index.ts
    echo "export * from './Styled$1';" >> $Path/$1/index.ts
}

TestFile() {
    # Test Boilerplate
    echo "import $1 from './$1';" >> $Path/$1/$1.test.tsx
    echo "import { render, screen } from '@testing-library/react';" >> $Path/$1/$1.test.tsx
    echo "" >> $Path/$1/$1.test.tsx
    echo "describe('$1', () => {" >> $Path/$1/$1.test.tsx
    echo "    it('renders without crashing', () => {" >> $Path/$1/$1.test.tsx
    echo "        render(<$1 />);" >> $Path/$1/$1.test.tsx
    echo "        expect(screen.getByText('$1 Component')).toBeInTheDocument();" >> $Path/$1/$1.test.tsx
    echo "    });" >> $Path/$1/$1.test.tsx
    echo "});" >> $Path/$1/$1.test.tsx
}

# if user input is 1 then create component
if [ "$choice" -eq 1 ]; then
    echo "Creating Component"
    read -p "Enter Component Name: " NAME

    if [ -z "$NAME" ]; then
        echo "You did not enter a Component Name"
    else
        echo "Component Name: $NAME"

        # check if directory exists
        if [ ! -d "$Path/$NAME" ]; then
            # Create component directory
            mkdir -p "$Path/$NAME"
            
            # Create all files
            touch $Path/$NAME/$NAME.tsx
            touch $Path/$NAME/Styled$NAME.ts
            touch $Path/$NAME/index.ts
            touch $Path/$NAME/$NAME.test.tsx

            # Write content to files
            Rfce $NAME
            StyledComponent $NAME
            IndexFile $NAME
            TestFile $NAME

            echo "Component '$NAME' created successfully with all files"
        else
            echo "Component '$NAME' already exists"
        fi
    fi

else
    echo "Deleting Component"
    read -p "Enter Component Name: " NAME
    
    if [ -z "$NAME" ]; then
        echo "You did not enter a Component Name"
    else
        if [ -d "$Path/$NAME" ]; then
            rm -rf "$Path/$NAME"
            echo "Component '$NAME' deleted successfully"
        else
            echo "Component '$NAME' does not exist"
        fi
    fi
fi