import axios from 'axios'
import { fromUnixTime, format } from 'date-fns'
import { QueryClientProvider, useQuery } from '@tanstack/react-query'
import parse from 'html-react-parser'

import { queryClient } from './queryClient'
import { modelReplies } from '../../model/replies'

export default function ThreadDetailWrapper(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThreadDetail {...props} />
        </QueryClientProvider>
    )
}

export function ThreadDetail({ token, thread, id }) {
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['reddit', thread, id],
        queryFn: () =>
            axios
                .get(`https://oauth.reddit.com/r/${thread}/comments/${id}`, {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                })
                .then((res) => res.data),
        select: (res) => {
            return {
                opTitle: res[0].data.children[0].data.title,
                opPostBy: res[0].data.children[0].data.author,
                voteCount: res[0].data.children[0].data.score,
                opTimePost: format(
                    fromUnixTime(res[0].data.children[0].data.created_utc),
                    'dd MMM yyyy'
                ),
                opContent: res[0].data.children[0].data.selftext_html,
                comment: modelReplies(res[1]),
            }
        },
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            <div className="px-4">
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <span className="text-xs font-bold">{thread}</span>
                        <span className="text-xs">{data.opTimePost}</span>
                    </div>
                    <span className="text-xs">{data.opPostBy}</span>
                </div>
                <h1 className="text-lg font-semibold">{data.opTitle}</h1>
                <div className="text-sm">{parse(parse(data.opContent))}</div>
                <div className=""></div>
                {/* <div>
                    {data.comment.map((comment) => (
                        <div key={comment.id}>
                            <ThreadComment {...comment} />
                        </div>
                    ))}
                </div> */}
            </div>
        </>
    )
}

export function ThreadComment(props) {
    return (
        <div className="px-1">
            <span>{props.postTime}</span>
            {props.replies?.length
                ? props.replies.map((reply) => {
                      console.log(reply)
                      return <ThreadComment key={reply.id} {...reply} />
                  })
                : null}
        </div>
    )
}
