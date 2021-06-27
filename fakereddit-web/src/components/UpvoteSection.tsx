import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        aria-label="Vote Up"
        onClick={() => console.log("yo")}
        icon={<ChevronUpIcon />}
      />
      {post.points}
      <IconButton aria-label="Vote Down" icon={<ChevronDownIcon />} />
    </Flex>
  );
};
