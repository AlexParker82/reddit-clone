import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import { TiHome } from "react-icons/ti"
import React from 'react';
import Communities from './Communities';

const Directory: React.FC = () => {

  return (
    <Menu>
      <MenuButton mr={2} ml={{ base: 0, md: 2 }} cursor="pointer" padding="0px 6px" borderRadius={4} _hover={{ outline: "1px solid", outlineColor: "gray.200" }}>
        <Flex align="center" justify="space-between" width={{ base: "auto", lg: "200px" }}>
          <Flex align="center">
            <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontSize="10pt" fontWeight={600}>Home</Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList mt={2}>
        <Communities />
      </MenuList>
    </Menu>
  )
}
export default Directory;