import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

const CATEGORY = 'Categories';

export interface Category {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient, private fireStore: AngularFirestore) {
    this.getCategories().subscribe(data => {
      if (!data || data.length === 0) {
        this.createCategories();
      }
    });

  }

  public getCategories(): Observable<Category[]> {
    return this.fireStore.collection<Category>(CATEGORY).valueChanges();
  }

  private createCategories() {
    this.httpClient.get<any[]>('assets/categories.json').subscribe(data => {
      data.forEach(c => {
        for (const key of Object.keys(c)) {
          const category: Category = {id: key, name: c[key].name};
          this.fireStore.collection(CATEGORY).doc(key).set(category).then();
        }

      });
    });
  }
}
