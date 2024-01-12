import { fromUnixTime, format } from 'date-fns'

export const modelReplies = (replies) =>
    replies.data.children.map((reply) => ({
        id: reply.data.id,
        content: reply.data.body,
        postBy: reply.data.author,
        postTime: reply.data.created_utc,
        ...(reply.data.replies?.data && {
            replies: modelReplies(reply.data.replies),
        }),
    }))
