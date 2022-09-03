// import { Post } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { db } from "../../prisma";

type PostType = {
    post: {
        id: number;
        text: string;
        title: string;
    }
}

const Post: NextPage<PostType> = (props) => {
    return <article>
        <h1>Title: {props.post.title}</h1>
        <p className="text">
            {props.post.text}
        </p>
        <style jsx>
            {`
                .text {
                    color: red;
                }
            `}
        </style>
    </article>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const postId = parseInt(context.query.id as string)    
    const post = await db.post.findUnique({
        where: {
            id: postId
        },
        select: {
            id: true,
            text: true,
            title: true
        }
    })
    return {
        props: {
            post
        }
    }
}

export default Post