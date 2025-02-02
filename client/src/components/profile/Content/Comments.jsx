import Comment from "@/components/Comments/Comment.jsx";
import Loading from "@/components/Common/Loading.jsx";
import { boxGradients } from "@/config/styles.js";
import { getUserComments } from "@/store/slices/profileSlice.js";
import { useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux"

const Comments = () => {
    const { profile } = useSelector(state => state.profileSlice);
    const { comments, commentControls: { nextPage } } = useSelector(state => state.profileSlice);

    const dispatch = useDispatch();
    const handleCommentFetching = () => {
        if (profile?._id) {
            dispatch(getUserComments(profile?._id));
        }
    }

    useEffect(() => {
        handleCommentFetching();
    }, [profile])

    return (
        <div>
            <InfiniteScroll
                className='flex flex-col justify-center items-center gap-7 pt-6'
                dataLength={comments?.length}
                next={handleCommentFetching}
                hasMore={nextPage != null}
                loader={<Loading />}
                endMessage={
                    <div className='h-[50px] w-full py-4 rounded-md text-center flex justify-center items-center'>
                        That All Daisy!
                    </div>
                }
            >
                {
                    comments?.length
                        ?
                        comments?.map((comment, index) => (
                            <CommentWrapper index={index}>
                                <Comment comment={comment} key={index} index={index} />
                            </CommentWrapper>))
                        :
                        <Loading />
                }
            </InfiniteScroll>
        </div>
    )
}


const CommentWrapper = ({ children, index }) => {
    return <div className="relative w-[90%] hover:slide-right-normal">
        <div
            className={`absolute -inset-1 rounded-lg ${boxGradients[index % 5]} opacity-80 blur-[8px]`}
        ></div>
        <div className="relative bg-clip-padding backdrop-filter backdrop-blur-x2l bg-opacity-90 backdrop-saturate-100 backdrop-contrast-100 border rounded-md w-full text-slate-300 bg-black">
            {children}
        </div>
    </div>
}


export default Comments