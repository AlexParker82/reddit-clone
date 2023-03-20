import { authModalState } from '@/atoms/authModalAtom';
import { Community, CommunitySnippet, communityState } from '@/atoms/communitiesAtom';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    setLoading(true);
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`));
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));

    } catch (error: any) {
      console.error(error);
      setError(error.message);
    };
    setLoading(false);
  };

  const joinCommunity = async (communityData: Community) => {
    setLoading(true);

    try {
      const batch = writeBatch(firestore);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };
      const snippetRef = doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id);
      const communityRef = doc(firestore, "communities", communityData.id);

      batch.set(snippetRef, newSnippet);
      batch.update(communityRef, {
        numberOfMembers: increment(1),
      });
      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet]
      }))

    } catch (error: any) {
      console.error("joinCommunity Error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    setLoading(true);

    try {
      const batch = writeBatch(firestore);

      const snippetRef = doc(firestore, `users/${user?.uid}/communitySnippets`, communityId);
      const communityRef = doc(firestore, "communities", communityId);

      batch.delete(snippetRef);
      batch.update(communityRef, {
        numberOfMembers: increment(-1),
      });
      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter((item) => item.communityId !== communityId)
      }))

    } catch (error: any) {
      console.error("leaveCommunity Error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    loading,
    communityStateValue,
    onJoinOrLeaveCommunity
  };
}
export default useCommunityData;