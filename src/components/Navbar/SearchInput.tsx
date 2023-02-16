import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

type SearchInputProps = {

};

const SearchInput: React.FC<SearchInputProps> = () => {

    return (
        <Flex align="center">
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input type='search' placeholder='Search Reddit' />
            </InputGroup>
        </Flex>
    )
}
export default SearchInput;