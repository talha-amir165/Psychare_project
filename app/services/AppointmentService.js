import GenericService from "./GenericService";
class AppointmentService extends GenericService {
    addAppointment = (data) => this.post("appointments", data);
    deleteAppointment = (_id) => this.delete("appointments/" + _id);
    updateAppointment = (_id, data) => this.put("appointments/" + _id, data);
    getAppointments = () => this.get("appointments");
    getpsychologistappointments = (id) =>
        this.get("appointments/psychologist/" + id);

    getpatienttappointments = (id) => this.get("appointments/patient/" + id);
}

let appointmentService = new AppointmentService();
export default appointmentService;