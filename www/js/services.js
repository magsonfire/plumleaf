angular.module('starter.services', [])
.factory('Questions', function($localStorage) {
	var questions = [
	{question: 'Does your loved one live at home?', 
		check: ["1They live at Home", "1They live in a care Facility"], 
		check_multi: [],
		img: ''},
	{question: "Are they able to get out of a chair on their own?", 
		check: ['2Yes', '2No'], 
		check_multi: []},
	{question: "Do they need meals prepared for them?", 
		check: ["3Yes", "3No"], 
		check_multi: []},
	{question: "Do they experience incontinence?", 
		check: ["4Yes", "4No"], 
		check_multi: []},
	{question: "Do they need any of the following services?", 
		check: [], 
		check_multi: ["5Medical Monitoring", "5Medicine Dispenser", "5Diabetic Support", "5Transportation Assistance"]},
	{question: "Would they be living with you or another caregiver?", 
		check: ["6Yes", "6No"]},
	{question: "Do you need any legal advice to handle their estate?", 
		check: ["7Yes", "7No"]}
	];

	return {
		getQuestion: function(_index)
		{
			return questions[_index];
		},
		getAll: function()
		{
			return questions;
		}
	};
})

.factory('costBreakdown', function() {
	var categories = [
	{category: "Home Care",
		items: 5},
	{category: "Support Equipment",
		items: 5},
	{category: "Long-Term Care",
		items: 3},
	{category: "Personal Support Workers",
		items: 4},
	{category: "Community Care",
		items: 3},
	{category: "Medical & Health",
		items: 2},
	{category: "Professional Services",
		items: 2},
	{category: "Unpredictable",
		items: 3}
	];

	// Amount based on per month or one-time
	// If per-hour, it is given in another attribute
	var costs = [
	{cost: "Ramps",
		category: "Home Care",
		amount: [200, 8000]},
	{cost: "Bath Lift",
		category: "Home Care",
		amount: [1200]},
	{cost: "Electrical Hospital Bed",
		category: "Home Care",
		amount: [200, 8000]},
	{cost: "Sask-A-Poles",
		category: "Home Care",
		amount: [240]},
	{cost: "Personal Support Worker",
		category: "Home Care",
		amount: [1400, 5000]},
	{cost: "Wheelchair",
		category: "Support Equipment",
		amount: [400, 4000]},
	{cost: "Walker",
		category: "Support Equipment",
		amount: [100, 450]},
	{cost: "Incontinence Supplies",
		category: "Support Equipment",
		amount: [1400, 2100]},
	{cost: "Scooter",
		category: "Support Equipment",
		amount: [2400, 5000]},
	{cost: "Medicine Dispenser",
		category: "Support Equipment",
		amount: [800]},
	{cost: "Adult Day Programs",
		category: "Long-Term Care",
		amount: [500, 2000]},
	{cost: "Supportive Housing",
		category: "Long-Term Care",
		amount: [4584]},
	{cost: "Retirement Homes",
		category: "Long-Term Care",
		amount: [1500, 6000]},
	{cost: "One-on-One Care (Light Tasks)",
		category: "Personal Support Workers",
		amount: [552]},
	{cost: "One-on-One Care (Incontinence)",
		category: "Personal Support Workers",
		amount: [1100]},
	{cost: "One-on-One Care (Constant)",
		category: "Personal Support Workers",
		amount: [3320]},
	{cost: "Nurse (Medical Monitoring)",
		category: "Personal Support Workers",
		amount: [8400]},
	{cost: "Transportation",
		category: "Community Care",
		amount: [200],
		detail: "$8 - $20 per day, calculated here at $10/day every weekday for a month."},
	{cost: "Meal Delivery",
		category: "Community Care",
		amount: [300],
		detail: "$10 per meal, 30 meals per month"},
	{cost: "Community Dining",
		category: "Community Care",
		amount: [280],
		detail: "$9 per meal, 30 meals per month"},
	{cost: "Prescription Drugs for Dementia",
		category: "Medical & Health",
		amount: [150],
		detail: "Roughly $5 per day"},
	{cost: "Diabetes",
		category: "Medical & Health",
		amount: [170]},
	{cost: "Power of Attorney",
		category: "Professional Services",
		amount: [250]},
	{cost: "Will Preparation",
		category: "Professional Services",
		amount: [300],
		detail: ""},
	{cost: "Time Off Work",
		category: "Unpredictable",
		amount: ["Varies"],
		detail: "Depends on your situation."},
	{cost: "Travel",
		category: "Unpredictable",
		amount: ["Varies"],
		detail: "Depends on your situation."},
	{cost: "Accomodations",
		category: "Unpredictable",
		amount: ["Varies"],
		detail: "Depends on your situation."}
	];

	return {
		getCosts: function()
		{
			return costs;
		},
		getCategories: function()
		{
			return categories;
		},
	};
})

.factory('costCalculator', function($localStorage) {
	var YEARTOTAL = 0;
	var initTotal = 0;
	var monthTotal = 0;

	console.log(YEARTOTAL);

	var _getTotalCost = function(ansArr) {
			//Mass assignment
			var home = ansArr[0], 
				high_mobility = ansArr[1], 
				cook = ansArr[2], 
				incontinant = ansArr[3], 
				medical_monitoring = ansArr[3], 
				medical_despencer = ansArr[2],
				diabetic = ansArr[1], 
				living_with = ansArr[5], 
				need_legal = ansArr[6];

			// living in a facility   
			//high_mobility =  Is able to get out of a chair
			var low_mobility = !(high_mobility); //  Unable to get out of a chair on their own
			//cook =  true if they do not need meals prepared
			// incontinant =  True if they are incontinant
			
			//medical_monitoring= "bool";
			//medical_despencer = "bool";
			//diabetic = "bool";
			//transport_assistance = "bool";
			
			//living_with = true if they are living with their care giver
			//need_legal =  true if they have to use legal advice to settle their assate
			
			// Init costs
			var one_time_cost = 0;
			var meal_cost = 0;
			var psw_hours = 0;
			var nurse_cost = 0
			var diabetic_yearly_cost = 0;
			var facility_cost = 0;
			
			var psw_wage = 23;

			if (home){
				if (low_mobility){
					one_time_cost += 10200;
				}else{
					one_time_cost += 1290;
				}
				if (!cook){
					if (incontinant){
						if (!live_with){
							psw_hours = 3 * 4;
							meal_cost += 80;
						}else{
							psw_hours = 3 * 2;
							meal_cost += 60;
						}
					}else{ // not incontinant
						if (!live_with){
							psw_hours = 3 * 2;
							meal_cost += 38;
						}else{
							meal_cost += 30;
						}
					}
				}
			}else{
				facility_cost += 3750;
				} 
			if (medical_monitoring){
				nurse_cost += 30 * 7 * 3; 
				}
			if (medical_despencer){
				one_time_cost += 800
				}
			if (diabetic){
				diabetic_yearly_cost += 2050
			}
			if (need_legal){
				one_time_cost += 500
				} 
			var psw_cost = psw_hours * psw_wage;
			
			var months = 12;
			var weeks = 52;
			var days = 5;
			initTotal = one_time_cost;
			YEARTOTAL = ((weeks * ((meal_cost * days) + psw_cost + nurse_cost)) + diabetic_yearly_cost) + months *(facility_cost);
			monthTotal =  YEARTOTAL / 12;
			console.log(YEARTOTAL);
			return {
				YEARTOTAL: YEARTOTAL,
				monthTotal: monthTotal,
				initTotal: initTotal
			};
		};

	return {		
		getTotalCost: _getTotalCost,
		YEARTOTAL: YEARTOTAL,
		initTotal: initTotal,
		monthTotal: monthTotal
	};
});