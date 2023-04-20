import { Injectable } from "@angular/core";
import { LiquidCacheService } from 'ngx-liquid-cache';

@Injectable({
    providedIn: 'root'
})

export class DataCacheService {
    
    public cacheObject: LiquidCacheService | undefined;
    constructor(private cache: LiquidCacheService) {}

    clearCache(label: string) {
        console.log(this.cache.get(label));
        this.cache.remove(label);
    }

}
