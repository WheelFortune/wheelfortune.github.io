pragma solidity ^0.4.23;
import "./SafeMath.sol";
import "./Ownable.sol";

//
contract WheelOfFortune is Ownable {
	using SafeMath for uint;

	struct PlaceBet{
		uint8 winProbability;//probability of winning 1% -> 100%
		uint8 prizeRate;//ex: x0, x2, x5....
	}

	struct Bet{
		address player;
		uint bet_amount;
		uint8 result_place;
		uint win_amount; 
		uint time;
	}

	mapping(uint8 => PlaceBet) public placeBets;
	mapping(uint => Bet) public bets;

	uint private randomFactor;
	uint private totalUserBets;
	uint private totalUserWin;

	uint public currentBet;
	uint public gameMaxBet;
	uint public gameMinBet;
    uint public totalPlace;

	event UserBet(address indexed player, uint bet_amount, uint8 result_place, uint win_amount, uint id);

	//contract constructor
	constructor() public {
		randomFactor = now.mod(10);
		gameMaxBet = 2000000000;//2000 TRX
		gameMinBet = 1000000;//1 TRX
	    totalPlace = 20;
		uint8[20] memory prize = [0,8,0,2,0,6,0,5,0,0,4,0,3,0,2,0,2,0,10,0];//2(x2), 5(x5), ...
		uint8[20] memory win = [48,15,56,60,60,20,64,25,58,64,30,56,50,56,60,60,80,68,10,60];//sum = 1000 <=> (100%)
		for(uint8 i = 0; i < win.length; i++){
	        placeBets[i] = PlaceBet({winProbability: win[i], prizeRate: prize[i]});
	    }
	}

	function setPlaceBets(uint8[] win, uint8[] prize) public onlyOwner returns(uint){
	    totalPlace = win.length;
	    if (win.length != prize.length) revert("Error win.length != prize.length.");
	    uint totalWin = 0;
	    for(uint8 i = 0; i < totalPlace; i++){
	        totalWin = totalWin.add(win[i]);
	        if (prize[i] > totalPlace.mul(3)) revert("Error prize > totalPlacex3.");
	        placeBets[i] = PlaceBet({winProbability: win[i], prizeRate: prize[i]});
	    }
	    if (totalWin != 1000) revert("Error totalWin != 1000.");
	    return totalPlace;
	}

	function getMaxPrizeRate() public view returns(uint8) {
		uint8 maxRate = 0;
	    for(uint8 i = 0; i < totalPlace; i++){
	        if(placeBets[i].prizeRate > maxRate)maxRate = placeBets[i].prizeRate;
	    }
        return maxRate;
	}

	//
	function userBet(uint amount) public payable returns(uint, uint8, uint){
		if (msg.value < amount) revert("You not enough TRX provided.");
		if (amount < gameMinBet) revert("You place the bet amount smaller than the minimum amount.");
		if (amount > gameMaxBet) revert("You set the bet amount greater than the maximum amount.");
		if (amount.mul(getMaxPrizeRate()) > address(this).balance) revert("This contract not enough TRX provided.");
        totalUserBets = totalUserBets.add(amount);
		uint random_number = random_uint();
		randomFactor = randomFactor.add(random_number.mod(10).add(1));
		uint result_number = random_number.mod(1000);
		//
		uint8 result_place = 0;
		uint smallNum = 0;
	    uint bigNum = 0;
	    for(uint8 i = 0; i < totalPlace; i++){
	        bigNum = bigNum.add(placeBets[i].winProbability);
			if(result_number >= smallNum && result_number < bigNum){
				result_place = i;
				break;
			}
			smallNum = bigNum;
	    }
		//
		uint win_amount = 0;
		if(placeBets[result_place].prizeRate > 0){
			win_amount = amount.mul(placeBets[result_place].prizeRate);
			totalUserWin = totalUserWin.add(win_amount);
			msg.sender.transfer(win_amount);
		}
		bets[currentBet] = Bet({
			player: msg.sender,
			bet_amount: amount,
			result_place: result_place,
			win_amount: win_amount,
			time: now
		});
        uint id = currentBet;
		emit UserBet(msg.sender, amount, result_place, win_amount, id);
		currentBet++;
	}

	function getRandomFactor() public onlyOwner view returns(uint) {
        	return randomFactor;
	}

	function setRandomFactor(uint num) public onlyOwner {
        	randomFactor = num;
	}

	function getTotalUserBets() public onlyOwner view returns(uint) {
        	return totalUserBets;
	}

	function getTotalUserWin() public onlyOwner view returns(uint) {
        	return totalUserWin;
	}


	function setGameMaxBet(uint num) public onlyOwner {
        	gameMaxBet = num;
	}

	function setGameMinBet(uint num) public onlyOwner {
        	gameMinBet = num;
	}
	//random
	function random_uint() private view returns (uint256) {
		return uint256(blockhash(block.number-1-block.timestamp.mod(100))) + randomFactor;
	}

	//withdraw
	function withdraw(uint amount) public onlyOwner {
		require(amount <= address(this).balance);
		owner().transfer(amount);
	}

    function() public payable{}
}
