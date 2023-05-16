import GenericService from "./GenericService";
class MovieService extends GenericService {
  constructor() {
    super();
  }
  addwebseries = (data) => this.post("webseries", data);
  deletewebseries = (_id) => this.delete("webseries/" + _id);
  updatewebseries = (_id, data) => this.put("webseries/" + _id, data);
  getwebseries = (page = 1, perPage = 10) =>
    this.get("webseries?page=" + page + "&perPage=" + perPage);
  getSinglewebseries = (id) => this.get("webseries/" + id);
}

let movieService = new MovieService();
export default movieService;
