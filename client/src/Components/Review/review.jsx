import React, {useState} from 'react'
import style from './review.module.scss'
import { FaStar } from 'react-icons/fa';


export function Review({id}){
    // const [userLog] = useLocalStorage("supabase.auth.token")
    // const userId = userLog.currentSession.user.id
    const userId = "a89f265a-c5be-4de5-a961-a8e63fa204cd"
    const [review, setReview] = useState({
        rating: null,
        description: null,
        userId,
        productId: id,
        isRated: null
      });

    const [hover, setHover] = useState(null);

      const submitReview = (e) => {
        e.preventDefault();
      }

    return(
        <div className={style.containerReview}>
            <span>Rate this product!</span>
            <div>
                {[...Array(5)].map((star, i) => {
                   const ratingValue = i + 1;
                    return (
                    <label>
                        <input 
                        type="radio" 
                        name="rating" 
                        id="" 
                        value={ratingValue}
                        onClick={() => setReview({
                            ...review,
                            rating: ratingValue,
                            isRated: true
                        })}
                        />
                        <FaStar className={style.star} size={50} 
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        color={ratingValue <= (hover || review.rating) ? "#9abf15" : "#e4e5e9"}/>
                    </label>
                    )
                })}
            </div>
            <form className={style.formReview}>
            {review.isRated ? ( 
                <div>
                <span>Would you like to give your opinion to others?</span>
                <textarea name="description" rows="10" cols="50" 
                placeHolder="Leave us your opinion about this product!"
                onChange={(e) => {setReview({
                    ...review,
                    description: e.target.value
                })}}
                onSubmit={submitReview} ></textarea>
                </div>
            ) : null}
            <input type="submit" value="Publicar reseña"/>

            </form>
        </div>
    )
}