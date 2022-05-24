import {makeAutoObservable} from "mobx";
export default class DoctorStore{
    constructor() {
        this._doctors = []
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