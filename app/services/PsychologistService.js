import GenericService from "./GenericService";
class PsychologistService extends GenericService {
    addPsychologist = (data) => this.post("users/psychologists/addnewpsychologist", data);
    deletePsychologist = (_id) => this.delete("users/psychologists/" + _id);
    updatePsychologist = (_id, data) =>
        this.put("users/psychologists/" + _id, data);
    //   getProducts = (page = 1, perPage = 10) =>
    //     this.get("products?page=" + page + "&perPage=" + perPage);
    getPsychologist = () => this.get("users/psychologists");
    getSinglePsychologist = (id) => this.get("users/psychologists/" + id);
}

let psychologistService = new PsychologistService();
export default psychologistService;