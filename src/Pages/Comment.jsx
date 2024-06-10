import React from 'react'
// Mui Importation (Start)
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
// Mui Importation (End)
import { useQuery, useMutation } from '@tanstack/react-query' // Import for useQuery
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { showcomment, createcomment } from './pagesslice'
import { useForm } from "react-hook-form"; // Import React Hook Form
import Loader2 from '../Common/Loader2';


const Comment = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [visibleComments, setVisibleComments] = useState(3);


    // Add comment process
    const userID = localStorage.getItem("id")
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { blogdetailslicedata } = useSelector((state) => state?.Blogsingle);

    // Reg For Add Comment 
    const addcom = async (data) => {

        const addcommentdata = {
            blog_Id: blogdetailslicedata?._id,
            user_id: userID,
            comment: data?.comment
        }


        const response = await dispatch(createcomment(addcommentdata))
        console.log("My Create Comment response is ", response);
        if (response && response?.type === "createcomment/fulfilled") {
            reset() // Form will be blank
            refetch() // Use For to show comment on show user page
            setLoading(false)
        } else {
            setLoading(false)
        }
        return response.data;
    };


    // Start Mutation Area
    const mutation = useMutation({
        mutationFn: (data) => addcom(data),
    });

    // End Mutation Area

    // Handle On Submit Area
    const onSubmit = (data) => {
        mutation.mutate(data);
        setLoading(true);
    };


    // Get Product For Use Query 
    const ShowComment = async () => {
        const response = await dispatch(showcomment(id))
        return response?.payload
    }

    // Use Query For Department
    const { isLoading, isError, data: showcommentdata, error, refetch } = useQuery({
        queryKey: ['showcomment'],
        queryFn: ShowComment // This line of code work as same as useEffect()
    })

    const handleLoadMore = () => {
        setVisibleComments(prev => prev + 3);
    };

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            {/*Show Comment Area Start*/}
            <h3>Comments {showcommentdata?.length}</h3>
            {Array.isArray(showcommentdata) && showcommentdata?.slice(0, showcommentdata.length).reverse().slice(0, visibleComments).map((value) => {
                return (
                    <>
                        <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {value?.user_id?.name.slice(0, 1)}
                                    </Avatar>
                                }

                                title={value?.user_id?.name}
                                subheader={value ? new Date(value.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) : ''}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {value?.comment}
                                </Typography>
                            </CardContent>
                        </Card>
                    </>
                )
            })}

            {visibleComments < showcommentdata?.length ? (
                <div className="text-center mt-3">
                    <p onClick={handleLoadMore} style={{ cursor: 'pointer', color: 'blue' }}>See More</p>
                </div>
            ) : null}

            {/*Show Comment Area End*/}

            {/*Add Comment Area Start*/}

            <div class="reply-form">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div class="row">
                        <div class="col form-group">
                            <textarea name="comment" class="form-control" placeholder="Your Comment*"

                                {...register("comment", {
                                    required: "This field is Required",
                                    minLength: {
                                        value: 3,
                                        message: "Message must be atleast 3 characters"
                                    }
                                })}

                            >
                            </textarea>
                            {errors?.comment && (
                                <p style={{ color: 'red' }}>{errors.comment.message}</p>
                            )}
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary mt-3">{loading ? <Loader2/> : 'Post Comment'}</button>

                </form>

            </div>

            {/*Add Comment Area End*/}

        </>
    )
}

export default Comment
