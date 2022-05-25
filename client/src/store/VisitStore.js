import {makeAutoObservable} from "mobx";
import {getAll} from "../https/visitApi";
export default class VisitStore{
    constructor(props) {
        this._visites = []
        this._selectedVisit = {}
        makeAutoObservable(this)
    }
    setVisit(visit){
        this._visites =visit
    }
    getVisit(){
        return this._visites
    }
    setSelectVisit(visit){
        this._selectedVisit = visit
    }
    getSelectVisit(){
        return this._selectedVisit
    }
}