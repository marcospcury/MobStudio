angular.module('appMobStudio').constant('consts', {
    appName: 'Mob Studio App',
    version: '1.0',
    owner: 'MrRobot',
    year: '2017',
    site: 'http://mr-robot.cloud',
    apiUrl: 'http://localhost:3000/api',
    awsUrl: 'https://s3-sa-east-1.amazonaws.com/mobstudio',
  }).run(['$rootScope', 'consts', function($rootScope, consts) {
    $rootScope.consts = consts
  }])