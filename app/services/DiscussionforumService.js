import GenericService from "./GenericService";
class DiscussionforumService extends GenericService {
  addDiscussionforum = (data) => this.post("discussionforums", data);
  deleteDiscussionforum = (_id) => this.delete("discussionforums/" + _id);
  updateDiscussionforum = (_id, data) =>
    this.put("discussionforums/" + _id, data);
  //   getProducts = (page = 1, perPage = 10) =>
  //     this.get("products?page=" + page + "&perPage=" + perPage);
  getDiscussionforum = () => this.get("discussionforums");
  getSingleDiscussionforum = (id) => this.get("discussionforums/" + id);
}

let discussionforumService = new DiscussionforumService();
export default discussionforumService;
