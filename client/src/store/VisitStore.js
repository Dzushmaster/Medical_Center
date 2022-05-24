import {makeAutoObservable} from "mobx";
export default class VisitStore{
    constructor(props) {
        this._visites = [
            {id: 1, cabinet: 200,date: '2022.02.22', begin: '08:00', end:'19:00', docId: 1},
            {id: 1, cabinet: 200,date: '2022.02.22', begin: '08:00', end:'19:00', docId: 1},
            {id: 1, cabinet: 200,date: '2022.02.22', begin: '08:00', end:'19:00', docId: 1},
            {id: 1, cabinet: 200,date: '2022.02.22', begin: '08:00', end:'19:00', docId: 1}
        ]
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