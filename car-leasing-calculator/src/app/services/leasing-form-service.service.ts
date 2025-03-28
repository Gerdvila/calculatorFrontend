import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  Details,
  Model,
  ModelInfo,
  ModelInfoAPIResponse,
  Variant,
} from '../types';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class LeasingFormService {
  constructor(private http: HttpClient) {}

  getCarMakes(): Observable<string[]> {
    return this.http
      .get<{ carMakes: string[] }>(`${environment.API_URL}/public/carApi/makes`)
      .pipe(
        map((response) => response.carMakes),
        catchError((error) => {
          console.error('Error fetching car makes', error);
          return throwError(() => error);
        })
      );
  }

  getModelsForMake(make: string): Observable<Model[]> {
    return this.http
      .get<{ carModels: Model[] }>(
        `${environment.API_URL}/public/carApi/models?make=${make}`
      )
      .pipe(
        map((response) => response.carModels),
        catchError((error) => {
          console.error('Error fetching car models', error);
          return throwError(() => error);
        })
      );
  }

  getInfoForModel(modelID: number): Observable<ModelInfo> {
    return this.http
      .get<ModelInfoAPIResponse>(
        `${environment.API_URL}/public/carApi/model_info?model_id=${modelID}`
      )
      .pipe(
        map((response) => {
          if (response) {
            return {
              variants: response.variants,
              details: {
                years: response.years,
                fuelTypes: response.fuelTypes,
                enginePowers: response.enginePowers,
                engineSizes: response.engineSizes,
              },
            };
          } else {
            throw new Error('Invalid response from server');
          }
        }),
        catchError((error) => {
          console.error('Error fetching model info', error);
          return throwError(() => error);
        })
      );
  }

  getInfoForVariant(variantID: number): Observable<Details> {
    return this.http
      .get<Details>(
        `${environment.API_URL}/public/carApi/variant_info?variant_id=${variantID}`
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching variant info', error);
          return throwError(() => error);
        })
      );
  }

  findModelByName(
    modelName: string,
    carModels$: Observable<Model[]>
  ): Observable<Model> {
    return carModels$.pipe(
      map((models) => {
        const model = models.find((model) => model.name === modelName);
        if (model) {
          return model;
        } else {
          throw new Error(`Model with name ${modelName} not found`);
        }
      }),
      catchError((error) => {
        console.error('Error finding model by name', error);
        return throwError(() => error);
      })
    );
  }

  findVariantByName(
    variantName: string,
    carModelVariants$: Observable<Variant[]>
  ): Observable<Variant> {
    return carModelVariants$.pipe(
      map((variants) => {
        const variant = variants.find(
          (variant) => variant.name === variantName
        );
        if (variant) {
          return variant;
        } else {
          throw new Error(`Variant with name ${variantName} not found`);
        }
      }),
      catchError((error) => {
        console.error('Error finding variant by name', error);
        return throwError(() => error);
      })
    );
  }
}
