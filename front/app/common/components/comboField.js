angular.module('appMobStudio').component('combofield', {
  bindings: {
    id: '@',
    label: '@',
    type: '@',
    grid: '@',
    source: '<',
    model: '=',
    change: '&',
    placeholder: '@',
    readonly: '<'
  },
  controller: [
    'gridSystem',
    function(gridSystem) {
      this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
    }
  ],
  template: `
   <div class="{{ $ctrl.gridClasses }}">
     <div class="form-group">
       <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
       <select ng-model="$ctrl.model" id="{{ $ctrl.id }}" class="form-control" ng-readonly="$ctrl.readonly" ng-change="$ctrl.change()">
          <option  ng-repeat="item in $ctrl.source" value="{{item.value}}">{{item.text}}</option>
       </select>
     </div>
   </div>
  `
});
