import { useEffect, useState } from "react"
import { BookDetail } from "../models/book.model";
import { fetchBook, likeBook, unLikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const { isloggedIn } = useAuthStore();
    const showAlert = useAlert();

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

    useEffect(() => {
        if (!bookId) return;

        fetchBook(bookId).then((book) =>{
            setBook(book);
        });

    }, [bookId]);

    return {book, likeToggle};
}