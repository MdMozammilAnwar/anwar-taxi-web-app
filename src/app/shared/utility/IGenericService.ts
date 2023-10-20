import { Observable } from 'rxjs';
export interface IGenericService<T> {
    GetAll(): Observable<T[]>;
    Get(id: any): Observable<T>;
    Add(entity: T): Observable<T[]>;
    Edit(entity: T): Observable<T[]>;
    Delete(entity: T): Observable<T[]>;
}
