import CreateCommunityModal from '@/components/Modal/CreateCommunity/CreateCommunityModal';
import { Flex, Icon, MenuItem, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GrAdd } from "react-icons/gr"

type CommunitiesProps = {

};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <MenuItem width="100%" _hover={{ bg: "gray.100" }} onClick={() => setOpen(true)}>
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          <Text fontSize="10pt">Create Community</Text>
        </Flex>
      </MenuItem>
    </>
  )
}
export default Communities;