import { fromUnixTime, format } from 'date-fns'

export const modelSubreddit = (thread) => ({
    title: thread.data.title,
    postedBy: thread.data.author,
    timePost: format(fromUnixTime(thread.data.edited), 'dd MMM yyyy'),
    commentCount: thread.data.num_comments,
    voteCount: thread.data.score,
})
