// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   if (typeof word !== "string") {
      return "Invalid input";
   }
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 };

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  return input.question("Let's play some scrabble! Enter a word:");
};
let word = initialPrompt();

// console.log(oldScrabbleScorer(word));

let simpleScorer = function(word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i =0; i< word.length; i++) {
      score += 1;
   }
   return score
};

 console.log(simpleScorer(word));

let vowelBonusScorer = function(word) {
   word = word.toLowerCase();
   let points = {
      'a': 3, 'e' : 3, 'i' : 3,'o' : 3,'u' : 3,
      'b' : 1, 'c' : 1, 'd' : 1, 'f' : 1, 'g' : 1,
      'h' : 1, 'j' : 1, 'k' : 1, 'l' : 1, 'm' : 1,
      'n' : 1, 'p' : 1, 'q' : 1, 'r' : 1, 's' : 1,
      't' : 1, 'v' : 1, 'w' : 1, 'x' : 1, 'y' : 1,
      'z' : 1,
   }
   
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      score += points[letter] || 0;
   }
   return score
};

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;
 
   for (let i = 0; i < word.length; i++) {
     const letter = word[i];
     score += newPointStructure[letter] || 0;
   }
 
   return score;
 }

// let scrabbleScorer = function scrabbleScorer(word, newPointStructure) {
//    let score = 0;
//    for (let letter of word.toLowerCase()) {
//        if (newPointStructure[letter] !== undefined) {
//            score += newPointStructure[letter];
//        }
//    }
//    return score;
// };

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
      
   },

   { 
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
},

{
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
   }

];
   // // Simple scoring
   // console.log("algorithm name: ", scoringAlgorithms[0].name);
   // console.log("scoringFunction result: ", scoringAlgorithms[0].scoringFunction("JavaScript"));
   // // Bonus Vowels
   // console.log("algorithm name: ", scoringAlgorithms[1].name);
   // console.log("scoringFunction result: ", scoringAlgorithms[1].scoringFunction("JavaScript"));
   //    // Scrabble
   //    console.log("algorithm name: ", scoringAlgorithms[2].name);
   //    console.log("scoringFunction result: ", scoringAlgorithms[2].scoringFunction("JavaScript"));

   function scorerPrompt() {
      console.log("Which scoring algorithm would you like to use?");
      console.log("0 - Simple Score: Each letter is worth 1 point.");
      console.log("1 - Bonus Vowels: Vowels are 3 pts, consonants are 1 pt.");
      console.log("2 - Scrabble: The traditional scoring algorithm.");
      let userInput = input.question ("Enter the number corresponding to the scoring system you would like to use");
   
      while (!["0", "1", "2"].includes(userInput)) {
         console.log("invalid input please enter 0, 1, or 2.");
         userInput = input.question("Enter the number corresponding to the scoring system you would like to use");
      }
      return scoringAlgorithms[userInput];
   }
   
   


function transform(oldPointStructure) {
      let newPointStructure = {};
      for (let pointValue in oldPointStructure) {
         if (oldPointStructure.hasOwnProperty(pointValue)) {
          let letters = oldPointStructure[pointValue];
          for (let  i = 0; i < letters.length; i++) {
             let letter = letters[i].toLowerCase();
             newPointStructure[letter] = Number(pointValue);
          }
         }
      }
      return newPointStructure;
      
  }


let newPointStructure= {
   'a': 1, 'b': 3, 'c': 3, 'd': 2, 'e': 1, 'f': 4, 'g': 2, 'h': 4,
   'i': 1, 'j': 8, 'k': 5, 'l': 1, 'm': 3, 'n': 1, 'o': 1, 'p': 3,
   'q': 10, 'r': 1, 's': 1, 't': 1, 'u': 1, 'v': 4, 'w': 4, 'x': 8,
   'y': 4, 'z': 10
};
console.log("Scrabble scoring values for");
console.log("letter a: ", newPointStructure.a);
console.log("letter j: ", newPointStructure.j);
console.log("letter z: ", newPointStructure["z"]);

function runProgram() {
let word = initialPrompt();
let selectedScorer = scorerPrompt();
let score = selectedScorer.scorerFunction(word);
console.log(`Score for '${word}': ${score}`);

   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
