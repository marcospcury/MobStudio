angular.module('appMobStudio').constant('consts', {
    appName: 'Mob Studio App',
    version: '1.0',
    owner: 'MrRobot',
    year: '2017',
    site: 'http://mr-robot.cloud',
    apiUrl: 'http://localhost:3000/api',
  }).run(['$rootScope', 'consts', function($rootScope, consts) {
    $rootScope.consts = consts
  }])