angular.module('starter.controllers', [])

.controller('WelcomeCtrl', function() {
	$scope.title = 'Welcome to Plum Leaf';
	$scope.message = "hello";
})

.controller('SurveyCtrl', function($stateParams, $rootScope, $scope, $localStorage, Questions, costCalculator)
{	
	$scope.Question = Questions.getQuestion(parseInt($stateParams.surveyId));
	// End of q's
	if (parseInt($stateParams.surveyId) >= Questions.getAll().length - 1)
	{
		// Send to review view
		$scope.nextLink = "#/tab/review";
	}
	else if (parseInt($stateParams.surveyId) <= 0)
	{ // Start of q's
		$scope.prevQuestion = 0;
		$scope.nextLink = "#/tab/survey/" + (parseInt($stateParams.surveyId) + 1);
	}
	else // All other cases
	{
		$scope.prevQuestion = parseInt($stateParams.surveyId) - 1;
		$scope.nextLink = "#/tab/survey/" + (parseInt($stateParams.surveyId) + 1);
	}
	$scope.check = function(answer)
	{
		if (parseInt(answer.substring(0,1)) != 5)
		{
			for (var item in $localStorage)
			{
				if (String(item).substring(0,1) === answer.substring(0,1))
				{
					delete $localStorage[item];
				}
			}
		}
		$localStorage[answer] = true;
	};
})

.controller('ReviewCtrl', function($scope, $localStorage, Questions, costCalculator) {
	$scope.title = 'Review';
	$scope.formData = $localStorage;
	$scope.message = [];
	$scope.Question = Questions.getAll();
	for (var i = 1; i <= $scope.Question.length; i++)
	{
		var ans = [];
		for (var item in $localStorage)
		{
			if (parseInt(item.substring(0,1)) == i)
			{
				ans.push(item.substring(1));
			}
		}
		$scope.message.push({question: $scope.Question[i-1].question, answers: ans});
	}
	$localStorage.parsedDat = [];
	var ar = [false, false, false, false];
	for (item in $localStorage)
	{
		if (item.substring(0,1) != "$")
		{
			if (parseInt(item.substring(0,1)) != 5)
			{
			$localStorage.parsedDat[parseInt(item.substring(0,1)) - 1] =
			(item === "1They live at Home"
				|| item === "2Yes" || item === "3Yes" 
				|| item === "4Yes" || item === "6Yes"
				|| item === "7Yes");
			}
		
			else 
			{	
				if (item === "5Medical Monitoring")
				{
					ar[0] = true;
				}
				else if (item === "5Medicine Dispenser")
				{
					ar[1] = true;
				}
				else if (item === "5Diabetic Support")
				{
					ar[2] = true;
				}
				else if (item === "5Transportation Assistance")
				{
					ar[3] = true;	
				}
			}
		}
	}
	$localStorage.parsedDat[4] = ar;
	$scope.clear = function ()
	{
		$scope.message = [];
		$localStorage.$reset();
	};
})

.controller('AssessmentCtrl', function(costBreakdown, $scope, $localStorage) {
	$scope.name = 'AssessmentCtrl';
	$scope.costs = costBreakdown.getCosts();
	$scope.categories = costBreakdown.getCategories();
})

.controller('ProjectionsCtrl', function($scope, costCalculator, $localStorage) {
	$scope.title = 'ProjectionsCtrl';
	$scope.message = "hello";

	// if ($localStorage.parsedDat = []) {
	// 	alert('You haven\'t taken the survey yet! Please take the assessment survey in order to find out your projected costs.');
	// } else {
	// 	var ansArr = $localStorage.parsedDat;
	// 	console.log(ansArr);
	// 	$scope.totalYearCost = costCalculator.getTotalCost(ansArr);
	// }

	var ansArr = $localStorage.parsedDat;
	costCalculator.getTotalCost 
	$scope.YearTotal = costCalculator.getTotalCost(ansArr).YEARTOTAL;
	$scope.MonthTotal = costCalculator.getTotalCost(ansArr).MonthTotal;
	$scope.InitTotal = costCalculator.getTotalCost(ansArr).initTotal;
	console.log($scope.YearTotal);
});