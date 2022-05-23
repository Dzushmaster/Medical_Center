import {makeAutoObservable} from "mobx";
export default class DoctorStore{
    constructor() {
        this._doctors = [
            {id: 1, fullname:'fullname', speciality: 'speciality', email:'email@com', password:'password', experience: 4},
            {id: 2, fullname:'fullname2', speciality: 'speciality2', email:'email2@com', password:'password2', experience: 10},
            {id: 3, fullname:'fullname', speciality: 'speciality', email:'email@com', password:'password', experience: 15},
            {id: 4, fullname:'fullname2', speciality: 'speciality2', email:'email2@com', password:'password2', experience: 10}
        ]
        this._selectedDoc = {}
        makeAutoObservable(this)
    }
    setDoctor(doctor){
        this._doctors =doctor
    }
    getDoctor(){
        return this._doctors
    }
    setSelectDoc(doctor){
        this._selectedDoc = doctor
    }
    getSelectDoc(){
        return this._selectedDoc
    }
}