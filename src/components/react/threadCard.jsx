import Comment from '../../icons/comment.svg'

export default function ThreadCard(props) {
    const {
        title,
        postedBy,
        timePost,
        commentCount,
        voteCount,
        url,
        id,
        thread,
    } = props
    return (
        <div className="border-b border-[#ccc] px-4 py-1">
            <a href={`/${thread}/${id}`}>
                <div className="flex flex-col gap-2">
                    <div>
                        <span className="text-xs font-bold">{postedBy}</span>
                        <span className="text-xs text-[#576F76]">
                            {timePost}
                        </span>
                    </div>
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <div className="flex flex-row gap-2">
                        <span className="flex h-[32px] flex-row items-center gap-[6px] rounded-full bg-[#EAEDEF] px-3">
                            <img
                                src={`${url}/src/icons/upvote.svg`}
                                className="text-base"
                            />
                            <span className="text-xs">{voteCount}</span>
                            <img
                                src={`${url}/src/icons/downvote.svg`}
                                className="text-base"
                            />
                        </span>
                        <span className="flex h-[32px] flex-row items-center gap-[6px] rounded-full bg-[#EAEDEF] px-3">
                            <img
                                src={`${url}/src/icons/comment.svg`}
                                className="text-xl"
                            />
                            <span className="text-xs">{commentCount}</span>
                        </span>
                    </div>
                </div>
            </a>
        </div>
    )
}
