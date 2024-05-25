import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { ActivityList } from '../models/todo-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  getTodoList(): Observable<ActivityList[]> {
    return this.http.get<ActivityList[]>(environment.apiUrl);
  }
  getCountList(): Observable<{ total: number; completed: number }> {
    return this.getTodoList().pipe(
      map((activities) => ({
        total: activities.length,
        completed: activities.filter((activity) => activity.isCompleted).length,
      }))
    );
  }
  getTodoListById(id: number): Observable<ActivityList> {
    return this.http.get<ActivityList>(`${environment.apiUrl}/${id}`);
  }
  addTodoList(activity: ActivityList): Observable<ActivityList> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.getTodoList().pipe(
      map((activities: any) => {
        const dbActivity = activities.find(
          (act: any) => act.id === activity.id.toString()
        );
        if (dbActivity) {
          throw new Error(`Activity with ID ${activity.id} already exists.`);
        }
        return activity;
      }),
      switchMap((newActivity) => {
        const payload = {
          ...newActivity,
          id: newActivity.id.toString(), //CONVERTED ID TO STRING DUE TO JSON SERVER
        };
        return this.http.post<ActivityList>(environment.apiUrl, payload, {
          headers,
        });
      })
    );
  }
  updateActivity(activity: ActivityList): Observable<ActivityList> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<ActivityList>(
      `${environment.apiUrl}/${activity.id}`,
      activity,
      { headers }
    );
  }
  deleteActivity(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${id}`);
  }
}
