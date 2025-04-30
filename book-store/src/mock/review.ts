import { BookReviewItem } from "@/models/book.model";
import { HttpResponse, http} from "msw";

export const reviewsById = http.get("http://localhost:9999/reviews/:bookId", () => {
    const data:BookReviewItem[] = [];
    return HttpResponse.json(data,{
        status: 200
    });
});