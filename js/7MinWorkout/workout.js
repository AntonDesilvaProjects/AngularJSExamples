/*angular.module('7minWorkout').controller('WorkoutController',
	function($scope)
	{

	}
);*/
angular.module('7minWorkout').controller('WorkoutController', ['$scope', '$interval', '$location', 
	function($scope, $interval,$location)
	{
		var restExercise;
		var workoutPlan;

		function Exercise(args)
		{
			this.name = args.name;
			this.title = args.title;
			this.description = args.description;
			this.image = args.image;
			this.related = {};
			this.related.videos = args.videos;
			this.nameSound = args.nameSound;
			this.procedure = args.procedure;
		}
		function WorkoutPlan(args)
		{
			this.exercises = [];
			this.name = args.name;
			this.title = args.title;
			this.restBetweenExercises = args.restBetweenExercises;
		}
		var createWorkout = function()
		{
			var workout = new WorkoutPlan( {
				name : "7minWorkout",
				title: "7 Minute Workout",
				restBetweenExercises: 10
			});

			workout.exercises.push({
				details: new Exercise({
					name: "jumpingJacks",
					title: "Jumping Jacks",
					description: "Jumping Jacks.",
					image: "img/JumpingJacks.png",
					videos: [],
					variations: [],
					procedure: "Jump up while raising both hands together over your head."
				}),
				duration: 30
			});
			workout.exercises.push({
				details: new Exercise({
					name: "pushups",
					title: "Push-ups",
					description: "Push-ups",
					image: "img/push-ups.png",
					videos: [],
					variations: [],
					procedure: "Lie on the floor and push up only with your hands."
				}),
				duration: 30
			});

			return workout;
		}
		var startExercise = function( exercisePlan )
		{
			$scope.currentExercise = exercisePlan;
			$scope.currentExerciseDuration = 0;
			$interval( function()
			{
				++$scope.currentExerciseDuration;

			}, 1000, $scope.currentExercise.duration ).then( function()
			{
				var next = getNextExercise(exercisePlan);
				if(next)
					startExercise(next);
				else
					$location.path('/finish');
			});
		};

		var startWorkout = function()
		{
			workoutPlan = createWorkout();
			restExercise = {
				details: new Exercise({
					name: "rest",
					title: "Relax!",
					description: "Relax a bit!",
					image: "img/rest.png" 
				}),
				duration: workoutPlan.restBetweenExercises
			};
			startExercise( workoutPlan.exercises.shift() );
		}
		var getNextExercise = function( currentExercisePlan )
		{
			var nextExercise = null;
			if( currentExercisePlan == restExercise )
				nextExercise = workoutPlan.exercises.shift();
			else
			{
				if(workoutPlan.exercises.length != 0 )
					nextExercise = restExercise;
			}
			return nextExercise;
		}
		/*$scope.$watch('currentExerciseDuration', function(nVal){
				if( nVal == $scope.currentExercise.duration)
				{
					var next = getNextExercise($scope.currentExercise);
					if(next)
						startExercise(next);
					else
						console.log("workout complete!");
				}	
		});*/
		var init = function()
		{
			startWorkout();
		};
		init();
	}
]);