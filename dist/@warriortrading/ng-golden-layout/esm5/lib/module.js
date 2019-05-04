/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoldenLayoutConfiguration } from './config';
import { GoldenLayoutService } from './golden-layout.service';
import { GoldenLayoutComponent } from './golden-layout.component';
var GoldenLayoutModule = /** @class */ (function () {
    function GoldenLayoutModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    GoldenLayoutModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: GoldenLayoutModule,
            providers: [
                GoldenLayoutService,
                { provide: GoldenLayoutConfiguration, useValue: config }
            ]
        };
    };
    GoldenLayoutModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [GoldenLayoutComponent],
                    exports: [GoldenLayoutComponent],
                    imports: [CommonModule]
                },] }
    ];
    return GoldenLayoutModule;
}());
export { GoldenLayoutModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdhcnJpb3J0cmFkaW5nL25nLWdvbGRlbi1sYXlvdXQvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFpQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWxFO0lBQUE7SUFlQSxDQUFDOzs7OztJQVRlLDBCQUFPOzs7O0lBQXJCLFVBQXNCLE1BQWlDO1FBQ3JELE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRTtnQkFDVCxtQkFBbUI7Z0JBQ25CLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7YUFDekQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBZEYsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUNyQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDaEMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2lCQUN4Qjs7SUFXRCx5QkFBQztDQUFBLEFBZkQsSUFlQztTQVZZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEdvbGRlbkxheW91dENvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBHb2xkZW5MYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9nb2xkZW4tbGF5b3V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgR29sZGVuTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnLi9nb2xkZW4tbGF5b3V0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0dvbGRlbkxheW91dENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtHb2xkZW5MYXlvdXRDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBHb2xkZW5MYXlvdXRNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoY29uZmlnOiBHb2xkZW5MYXlvdXRDb25maWd1cmF0aW9uKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBHb2xkZW5MYXlvdXRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgR29sZGVuTGF5b3V0U2VydmljZSxcbiAgICAgICAgeyBwcm92aWRlOiBHb2xkZW5MYXlvdXRDb25maWd1cmF0aW9uLCB1c2VWYWx1ZTogY29uZmlnIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=