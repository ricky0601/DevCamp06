import { useLocation } from "react-router-dom"
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@/models/book.model";
import { Pagination } from "@/models/pagination.model";

interface FetchBooksResponse{
    books: Book[];
    pagination: Pagination;
}


export const useBooks = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const { data: booksData, isLoading: isBooksLoading } = useQuery<FetchBooksResponse, Error>({
        queryKey:["books", location.search],
        queryFn: () =>
        fetchBooks({
            category_id: params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
            check_new: params.get(QUERYSTRING.NEWS) ? true : undefined,
            currentPage: params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
            limit: LIMIT,
        })
    });
    return {
        books: booksData?.books,
        pagination: booksData?.pagination,
        isEmpty: booksData?.books.length === 0,
        isBooksLoading,
    };
};