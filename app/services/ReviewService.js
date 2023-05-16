import GenericService from "./GenericService";
class ReviewService extends GenericService {
    addReview = (_id, data) => this.post("reviews/" + _id, data); //_id=appointment id,data={"rating":3,"comment":"wah wah od experience"}
    getpsychologistreviews = (id) => this.get("reviews/" + id);
}

let reviewService = new ReviewService();
export default reviewService;