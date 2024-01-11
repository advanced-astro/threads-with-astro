import axios from 'axios'
import { fromUnixTime, format } from 'date-fns'
import { QueryClientProvider, useQuery } from '@tanstack/react-query'

import { queryClient } from './queryClient'
import ThreadCard from './threadCard'

export default function ThreadListWrapper({ token, url }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThreadList token={token} url={url} />
        </QueryClientProvider>
    )
}

export function ThreadList({ token, url }) {
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['reddit'],
        queryFn: () =>
            axios
                .get('https://oauth.reddit.com/r/DotA2/hot', {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                })
                .then((res) => res.data),
        select: (res) =>
            res.data.children.map((thread) => ({
                id: thread.data.id,
                thread: thread.data.subreddit,
                title: thread.data.title,
                postedBy: thread.data.author,
                timePost: format(
                    fromUnixTime(thread.data.edited),
                    'dd MMM yyyy'
                ),
                commentCount: thread.data.num_comments,
                voteCount: thread.data.score,
            })),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            {data.map((item) => (
                <ThreadCard key={item.id} url={url} {...item} />
            ))}
        </>
    )
}
