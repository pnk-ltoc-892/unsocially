import CommonPost from '@/components/Common/Post/CommonPost.jsx';
import { Button } from '@/components/ui/button.jsx';
import { getUserBookmarks } from '@/store/slices/profileSlice.js';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


const Bookmarks = () => {
    const { bookmarks } = useSelector(state => state.profileSlice);

    const handlePostLoading = () => {
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserBookmarks());
    }, []);

    return (
        <div>
            <div className='rounded-t-md mt-2'>
                {
                    bookmarks?.length ? bookmarks?.map((data,index) => <CommonPost post={data?.Post} key={index} />)
                    :
                    <div className='text-center py-4' >"No Saved Posts"</div>
                }
            </div>
            <div className='py-8 flex justify-center items-center gap-4' >
                <Button onClick={() => handlePostLoading(-1)}
                    // disabled={prevPage === null}
                >{"<"}</Button>
                {/* <Button>{page}</Button> */}
                <Button onClick={() => handlePostLoading(1)}
                    // disabled={nextPage === null}
                >{">"}</Button>
            </div>
        </div>
    )
}

export default Bookmarks