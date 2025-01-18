import Comment from "@/components/Comments/Comment.jsx";
import { Button } from "@/components/ui/button.jsx";
import { getUserComments } from "@/store/slices/profileSlice.js";
import { useEffect, useId } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";



const Comments = () => {
    const { user } = useSelector(state => state.auth);
    const { profile } = useSelector(state => state.profileSlice);
    const { comments } = useSelector(state => state.profileSlice);
    
    
    console.log(comments);
    

    const dispatch = useDispatch();
    useEffect( () => {
        if(profile?._id) dispatch(getUserComments(profile?._id))
        
    },[profile] )
    return (
        <div>
            <div className='rounded-t-md mt-2'>
                {
                    comments?.length ? comments?.map((comment) => <Comment comment={comment} key={comment._id} />)
                    :
                    <div className='text-center py-4' >"No Comments Found"</div>
                }
            </div>
            {/* <div className='py-8 flex justify-center items-center gap-4' >
                <Button onClick={() => handlePostLoading(-1)}
                    disabled={prevPage === null}
                >{"<"}</Button>
                <Button>{page}</Button>
                <Button onClick={() => handlePostLoading(1)}
                    disabled={nextPage === null}
                >{">"}</Button>
            </div> */}
        </div>
    )
}

export default Comments