import GenericService from "./GenericService";
class MovieService extends GenericService {
  constructor() {
    super();
  }
  addmovie = (data) => this.post("movies", data);
  deletemovie = (data) => this.delete("movies/",data);
  updatemovie = (_id, data) => this.put("movies/" + _id, data);
  // getmovie = (page = 1, perPage = 10) =>
  //   this.get("movies?page=" + page + "&perPage=" + perPage);
    getmovie =()=> this.get("movies");
  getSingleMovie = (id) => this.get("movies/" + id);
}

let movieService = new MovieService();
export default movieService;
