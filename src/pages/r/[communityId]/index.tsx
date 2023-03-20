import { Community } from '@/atoms/communitiesAtom';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import safeJsonStringify from 'safe-json-stringify';
import React from 'react';
import NotFound from '@/components/Community/NotFound';
import Header from '@/components/Community/Header';
import { Flex, Text } from '@chakra-ui/react';
import PageContent from '@/components/layout/PageContent';
import CreatePostLink from '@/components/Community/CreatePostLink';

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {

  if (!communityData) {
    return <NotFound />
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
        </>
        <>
          <div>RHS</div>
        </>
      </PageContent>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  try {
    const communityDocRef = doc(firestore, "communities", context.query.communityId as string);
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists() ? JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ) : "",
      }
    }
  } catch (error) {
    // Can add an error page here
    console.log("getServerSideProps", error)
  }
}

export default CommunityPage;