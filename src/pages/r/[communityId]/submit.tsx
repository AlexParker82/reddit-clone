import PageContent from '@/components/layout/PageContent';
import NewPostForm from '@/components/Posts/NewPostForm';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const SubmitPostPage: React.FC = () => {

  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid white">
          <Text fontWeight={800}>Create A Post</Text>
        </Box>
        <NewPostForm />
      </>
      <></>
    </PageContent>
  )
}
export default SubmitPostPage;