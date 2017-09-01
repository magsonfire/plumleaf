// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.registerBackButtonAction(function (event) {
    event.preventDefault();
  }, 100);
  $ionicPlatform.ready(function() {
    if (window.StatusBar) {StatusBar.styleDefault();}
  });
})

.config(function($localStorageProvider, $stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.welcome', {
    url: '/welcome',
    views: {
      'tab-welcome': {
        templateUrl: 'templates/welcome.html',
        controller: 'WelcomeCtrl'
      }
    }
  })

  .state('tab.survey', {
    url: '/survey/:surveyId',
    views: {
      'tab-survey': {
        templateUrl: 'templates/survey.html',
        controller: 'SurveyCtrl'
      },
    }
  })

  .state('tab.review', {
    url: '/review',
    views: {
      'tab-survey': {
        title: 'review',
        name: 'Review Your Answers',
        templateUrl: 'templates/review.html',
        controller: 'ReviewCtrl'
      }
    }
  })

  .state('tab.assessment', {
    url: '/assessment',
    views: {
      'tab-assessment': {
        title: 'assessment',
        templateUrl: 'templates/assessment.html',
        controller: 'AssessmentCtrl'
      }
    }
  })

  .state('tab.projections', {
    url: '/projections',
    views: {
      'tab-projections': {
        title: 'projections',
        templateUrl: 'templates/projections.html',
        controller: 'ProjectionsCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('tab/survey/0');

});