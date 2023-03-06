import { Menu, MenuButton, MenuList, MenuItem, Icon, Flex, MenuDivider, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { IoSparkles } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from "react-icons/md";
import React from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { auth } from '@/firebase/clientApp';
import { useSignOut } from 'react-firebase-hooks/auth';

type UserMenuProps = {
  user?: User | null
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [signOut, loading, error] = useSignOut(auth);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Menu>
      <MenuButton cursor="pointer" padding="0px 6px" borderRadius={4} _hover={{ outline: "1px solid", outlineColor: "gray.200" }}>
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <Icon fontSize={24} mr={1} color="gray.300" as={FaRedditSquare} />
            ) : (
              <Icon fontSize={24} color="gray.400" mr={1} as={VscAccount} />
            )}
            <ChevronDownIcon />
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList mt={2}>
        <MenuItem fontSize="10pt" fontWeight={700} _hover={{ bg: "blue.500", color: "white" }}>
          <Flex align="center" justify="center">
            <Icon fontSize={20} mr={2} as={CgProfile} />
            Profile
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={handleSignOut} fontSize="10pt" fontWeight={700} _hover={{ bg: "blue.500", color: "white" }}>
          {error && <Text textAlign="center" color="red" fontSize="10pt">{error.message}</Text>}
          <Flex align="center" justify="center">
            <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
            Log Out
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
export default UserMenu;