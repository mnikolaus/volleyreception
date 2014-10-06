var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
db.transaction(function (tx) {  
	tx.executeSql('DROP TABLE RECEPTIONS');
   tx.executeSql('CREATE TABLE IF NOT EXISTS RECEPTIONS (team,quality,zone,player)');
});

var myApp = angular.module('myApp', []);

myApp.controller('ReceptionController', ['$scope', function($scope) {
	$scope.HomeTeam = [
		{number: 1, name: "Samanta Fabris", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 2, name: "Senna Ušić-Jogunica", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 3, name: "Mia Jerkov", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 4, name: "Nikolina Jelić", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 5, name: "Maja Poljak", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 6, name: "Ana Grbac", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 7, name: "Bernarda Brčić", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 8, name: "Bernarda Ćutuk", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 9, name: "Sanja Popović", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 10, name: "Ivana Miloš", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 11, name: "Karla Klarić", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 12, name: "Marija Ušić", receptions: 0, bad:0, good:0, excellent:0, aces:0},
	];
	$scope.AwayTeam = [
		{number: 1, name: "Alisha Glass", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 2, name: "Kayla Banwarth", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 3, name: "Courtney Thompson", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 4, name: "Nicole Davis", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 5, name: "Kristin Lynn Hildebrand", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 6, name: "Jordan Quinn Larson - Burbach", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 7, name: "Kelly Murphy", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 8, name: "Christa Harmotto Dietzen", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 9, name: "Nicole Fawcett", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 10, name: "Kimberly Hill", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 11, name: "Foluke Akinradewo", receptions: 0, bad:0, good:0, excellent:0, aces:0},
		{number: 12, name: "Rachael Adams", receptions: 0, bad:0, good:0, excellent:0, aces:0},
	];
	$scope.HTotal = 0;
	$scope.ATotal = 0;
	$scope.HGood = 0;
	$scope.AGood = 0;
	$scope.Hex = 0;
	$scope.Aex = 0;
	$scope.Ha = 0;
	$scope.Aa = 0;
	
	$scope.SubmitForm = function() {
		var player = GetPlayer();
		var team = $scope.reception[0];
		var quality = $scope.reception[1];
		var zone = $scope.reception[2];
		db.transaction(function (tx) {  
		   tx.executeSql('INSERT INTO RECEPTIONS VALUES (?,?,?,?)',[team,quality,zone,player]);
		});
		AddData(player);
		
		$scope.reception = '';
	};
	function GetPlayer() {
		if($scope.reception.length==5) return $scope.reception[3]+$scope.reception[4];
		else return $scope.reception[3];
	}
	
	function AddData(player) {
		if($scope.reception[0]==1) {
			$scope.HomeTeam[player-1].receptions += 1;
			$scope.HTotal += 1;
			if($scope.reception[1]==1) {
				$scope.HomeTeam[player-1].aces += 1;
				$scope.Ha += 1;
			} 
			else if($scope.reception[1] == 2) {
				$scope.HomeTeam[player-1].bad += 1;
			}
			else if($scope.reception[1]==3) {
				$scope.HomeTeam[player-1].good += 1;
				$scope.HGood += 1;
			}
			else if($scope.reception[1]==4) {
				$scope.HomeTeam[player-1].excellent += 1;
				$scope.HomeTeam[player-1].good += 1;
				$scope.HGood += 1;
				$scope.Hex += 1;
			}
		}
		else {
			$scope.AwayTeam[player-1].receptions += 1;
			$scope.ATotal +=1;
			if($scope.reception[1]==1) {
				$scope.AwayTeam[player-1].aces += 1;
				$scope.Aa += 1;
			} 
			else if($scope.reception[1] == 2) {
				$scope.AwayTeam[player-1].bad += 1;
			}
			else if($scope.reception[1]==3) {
				$scope.AwayTeam[player-1].good += 1;
				$scope.AGood +=1;
			}
			else if($scope.reception[1]==4) {
				$scope.AwayTeam[player-1].excellent += 1;
				$scope.AwayTeam[player-1].good += 1;
				$scope.AGood +=1;
				$scope.Aex +=1;
			}
		}
	}
	results = [];
	
	$scope.CallModal =  function(player) {
		$scope.rec = [0,0,0,0,0,0,0,0,0];
		$scope.aces = [0,0,0,0,0,0,0,0,0];
		$scope.good = [0,0,0,0,0,0,0,0,0];
		$scope.exc = [0,0,0,0,0,0,0,0,0];
		$scope.name = player.name;
		db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM RECEPTIONS WHERE player = "'+player.number+'"',[], function(tx,res){
					for(i=0;i<res.rows.length;i++) {
						results[i] = res.rows.item(i);
					}
					console.log(results);
					for(i=0;i<results.length;i++) {
						console.log(results[i].zone-1);
								$scope.rec[results[i].zone-1] += 1;
								if(results[i].quality==1)	$scope.aces[results[i].zone-1] += 1;
								else if(results[i].quality==3)	$scope.good[results[i].zone-1] += 1;
								else if(results[i].quality==4)	$scope.exc[results[i].zone-1] += 1;
					}	
				},function(){alert("error");});
		});
		
	};
	//
	
	function errorHandler(transaction, error) {
	    alert("Error : " + error.message);
	}
	
}]);
