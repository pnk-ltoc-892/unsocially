import Comment from "@/components/Comments/Comment.jsx";
import Loading from "@/components/Common/Loading.jsx";
import { getUserComments } from "@/store/slices/profileSlice.js";
import { useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux"

const Comments = () => {
    const { profile } = useSelector(state => state.profileSlice);
    const { comments, commentControls: { nextPage } } = useSelector(state => state.profileSlice);

    const dispatch = useDispatch();
    const handleCommentFetching = () => {
        if(profile?._id){
            dispatch(getUserComments(profile?._id));
        }
    }

    useEffect(() => {
        handleCommentFetching();
    }, [profile])

    return (
        <div>
            <InfiniteScroll
                className='flex flex-col justify-center items-center gap-4'
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
                        comments?.map((comment, index) => <Comment comment={comment} key={index} />)
                        :
                        <Loading />
                }
            </InfiniteScroll>
        </div>
    )
}

export default Comments