/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoldenLayoutConfiguration } from './config';
import { GoldenLayoutService } from './golden-layout.service';
import { GoldenLayoutComponent } from './golden-layout.component';
export class GoldenLayoutModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: GoldenLayoutModule,
            providers: [
                GoldenLayoutService,
                { provide: GoldenLayoutConfiguration, useValue: config }
            ]
        };
    }
}
GoldenLayoutModule.decorators = [
    { type: NgModule, args: [{
                declarations: [GoldenLayoutComponent],
                exports: [GoldenLayoutComponent],
                imports: [CommonModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdhcnJpb3J0cmFkaW5nL25nLWdvbGRlbi1sYXlvdXQvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFpQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBT2xFLE1BQU0sT0FBTyxrQkFBa0I7Ozs7O0lBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBaUM7UUFDckQsT0FBTztZQUNMLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsU0FBUyxFQUFFO2dCQUNULG1CQUFtQjtnQkFDbkIsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTthQUN6RDtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFkRixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUNoQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBHb2xkZW5MYXlvdXRDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgR29sZGVuTGF5b3V0U2VydmljZSB9IGZyb20gJy4vZ29sZGVuLWxheW91dC5zZXJ2aWNlJztcbmltcG9ydCB7IEdvbGRlbkxheW91dENvbXBvbmVudCB9IGZyb20gJy4vZ29sZGVuLWxheW91dC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtHb2xkZW5MYXlvdXRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbR29sZGVuTGF5b3V0Q29tcG9uZW50XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgR29sZGVuTGF5b3V0TW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZzogR29sZGVuTGF5b3V0Q29uZmlndXJhdGlvbik6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogR29sZGVuTGF5b3V0TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEdvbGRlbkxheW91dFNlcnZpY2UsXG4gICAgICAgIHsgcHJvdmlkZTogR29sZGVuTGF5b3V0Q29uZmlndXJhdGlvbiwgdXNlVmFsdWU6IGNvbmZpZyB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19