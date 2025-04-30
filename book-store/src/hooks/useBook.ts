import { useEffect, useState } from "react"
import { BookDetail, BookReviewItem, BookReviewItemWrite } from "../models/book.model";
import { fetchBook, likeBook, unLikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { addBookReview, fetchBookReview } from "@/api/review.api";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const [cartAdded, setCartAdded] = useState<boolean>(false);
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const { isloggedIn } = useAuthStore();
    const {showAlert} = useAlert();

    const likeToggle = () =>{
        // 권한 확인

        if(!isloggedIn){
            showAlert('로그인이 필요합니다.');
            return;
        }

        if(!book) return;

        if(book.liked){
            // 라이크 -> 언라이크
            unLikeBook(book.id).then(() => {
                // 성공 처리
                setBook({
                    ...book,
                    liked: false,
                    likes: book.likes - 1,
                });
            })
        }else{
            // 언라이크 -> 라이크
            likeBook(book.id).then(()=>{
                // 성공 처리
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1,
                });
            });
        }
    };

    const addToCart = (quantity: number) => {
        if(!book) return;
        
        addCart({
            book_id : book.id,
            quantity : quantity,
        }).then(() => {
            setCartAdded(true);
            setTimeout(() => {
                setCartAdded(false);
            }, 3000);
        });
    };

    useEffect(() => {
        if (!bookId) return;

        fetchBook(bookId).then((book) =>{
            setBook(book);
        });

        fetchBookReview(bookId).then((reviews) => {
            setReviews(reviews);
        });

    }, [bookId]);

    const addReview = (data: BookReviewItemWrite) => {
        if(!book) return;
        addBookReview(book.id.toString(), data).then((res) => {
            // fetchBookReview(book.id.toString()).then((reviews) => {
            //     setReviews(reviews);
            // });
            showAlert(res?.message);
        });
    };

    return {book, likeToggle, addToCart, cartAdded, reviews, addReview};
}