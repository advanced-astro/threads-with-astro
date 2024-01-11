import axios from 'axios'
import { fromUnixTime, format } from 'date-fns'
import { QueryClientProvider, useQuery } from '@tanstack/react-query'

import { queryClient } from './queryClient'

export default function ThreadListWrapper({ token }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThreadList token={token} />
        </QueryClientProvider>
    )
}

export function ThreadList({ token }) {
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
            <div>ThreadList</div>
        </>
    )
}
