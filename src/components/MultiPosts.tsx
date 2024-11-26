import { Key } from "react";
import PostComp from "./PostComp";

interface multiPostProps {
    items: any[]
}

function MultiPosts({items}: multiPostProps) {

    const GROUP_SIZE = 4;
    console.log(items)

    const groupedPosts = items.reduce( 
        (acc, item) => {
          if (acc[acc.length - 1].length >= GROUP_SIZE) {
            return [...acc, [item]];
          }
          acc[acc.length - 1].push(item);
          return acc;
        },
        [[]]
      )
      console.log(groupedPosts)

    return (
        <div>
            <div className="container text-center">
            {groupedPosts.map((group: any[], index: Key | null | undefined) => (
                <div className="row align-items-start" key={index}>
                    {group.map((post) => (
                        <div className="col">
                            <PostComp item={{
                                postId: post.postId,
                                postImage: post.postImage,
                                postDescription: post.postDescription,
                                postLikes: post.postLikes,
                                postShares: post.postShares,
                                postText: post.postText,
                                username: post.username
                            }} ></PostComp>
                        </div>
                    ))}
                </div>
            ))}
            </div>
        </div>
    );
}

export default MultiPosts;