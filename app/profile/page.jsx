"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Profile from "@components/Profile";
const MyProfile = () => {
  const router = useRouter();
  const handleEdit = (post) => {  
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async (post) => {
    const hasConfirmDelete = confirm("Are you sure you want to delete this prompt");

    if (hasConfirmDelete) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`,{
          method: 'DELETE'
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log('error', error)
      }
    }
  };
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchUserProfile();
  }, []);
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
