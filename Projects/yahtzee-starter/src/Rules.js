/** Rule for Yahtzee scoring.
 *
 * This is an "abstract class"; the real rules are subclasses of these.
 * This stores all parameters passed into it as properties on the instance
 * (to simplify child classes so they don't need constructors of their own).
 *
 * It contains useful functions for summing, counting values, and counting
 * frequencies of dice. These are used by subclassed rules.
 */

class Rule {
  constructor(params) {
    // put all properties in params on instance
    Object.assign(this, params);
  }

  sum(dice) {
    // sum of all dice
    return dice.reduce((prev, curr) => prev + curr);
  }

  /*
  * Watch from 2:28 to 3:54
  * to understand what this function does
  * https://www.udemy.com/modern-react-bootcamp/learn/lecture/14375922?start=15#questions
  * 
  */
  freq(dice) {
    // frequencies of dice values
    const freqs = new Map();
    for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1);
    return Array.from(freqs.values());
  }

  count(dice, val) {
    // # times val appears in dice
    return dice.filter(d => d === val).length;
  }
}

/** Given a sought-for val, return sum of dice of that val.
 *
 * Used for rules like "sum of all ones"
 */

class TotalOneNumber extends Rule {
  evalRoll = dice => {
    return this.val * this.count(dice, this.val);
  };
}

/** Given a required # of same dice, return sum of all dice.
 *
 * Used for rules like "sum of all dice when there is a 3-of-kind"
 */

class SumDistro extends Rule {
  evalRoll = dice => {
    // do any of the counts meet of exceed this distro?
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    /* 
    * so freq gives us an array, remember, freq array just gives us how many are there of number
    * so if we have [1,2,2,3] we would get after running the freq thing [1,2,1] or we have
    * 1 of something where the value is 1, 2 of something where the value is 2, and so on
    * Then if we read the mozila documentation of some function, we are running that some function
    * on the returned array from freq, so after lets say freq returned 
    * [1,2,1] , we have [1,2,1].some(), and what some does is take every value 
    * and see if they meet a conditon, if any of those values meet conditon, it returns true,
    * otherwise it returns false.
    * So if it reutnres true, we run the sum function.
    */

    return this.freq(dice).some(c => c >= this.count) ? this.sum(dice) : 0;
  };
}

/** Check if full house (3-of-kind and 2-of-kind) */

class FullHouse extends Rule {
  evalRoll = (dice) => {
   const freqs =  this.freq(dice);
   return (freqs.includes(2) && freqs.includes(3))? this.score: 0;
  }
}

/** Check for small straights. */
// Like if the dices are 1234, 2345, 3456 etc
class SmallStraight extends Rule {
  evalRoll = dice => {
    const d = new Set(dice);

    //straight can be 234, and either 1 or 5
    if ( (d.has(2) && d.has(3) && d.has(4)) && (d.has(1) || d.has(5) ) ) {
      return this.score;
    }

    // it can be either 345+ either 2 or 6
    if ((d.has(3) && d.has(4) && d.has(5)) && (d.has(2) || d.has(6)) ){
      return this.score;
    }

    return 0;
  };
}

/** Check for large straights. */

class LargeStraight extends Rule {
  evalRoll = dice => {
    /* 
    * set gives us a unique stuff, so 
    * here since dice is an array, if we have [1,1,2,3,4,5]
    * then d will be equal to [1,2,3,4,5], the second 1 will be
    * eliminated to maintain uniqueness.
    * The reason is, for LargeStraight, they have to be all 
    * different. So if we had lets say [1,2,2,3,4,6] then
    * it would not be straight six. One easy way to see
    * that is to make a set ouf of the dice array, and if the
    * length of that array is 5, which means all of them are 
    * unique, then it is Large straight six.
    * Also we can't have [1,3,4,5,6], we can only have only one
    * 1 or 6, that is why we need the checking part
    */
    const d = new Set(dice);

    // large straight must be 5 different dice & only one can be a 1 or a 6
    return d.size === 5 && (!d.has(1) || !d.has(6)) ? this.score : 0;
  };
}

/** Check if all dice are same. */

class Yahtzee extends Rule {
  evalRoll = dice => {
    // all dice must be the same
    return this.freq(dice)[0] === 5 ? this.score : 0;
  };
}

// ones, twos, etc score as sum of that value
const ones = new TotalOneNumber({ val: 1 });
const twos = new TotalOneNumber({ val: 2 });
const threes = new TotalOneNumber({ val: 3 });
const fours = new TotalOneNumber({ val: 4 });
const fives = new TotalOneNumber({ val: 5 });
const sixes = new TotalOneNumber({ val: 6 });

// three/four of kind score as sum of all dice
const threeOfKind = new SumDistro({ count: 3 });
const fourOfKind = new SumDistro({ count: 4 });

// full house scores as flat 25
const fullHouse = new FullHouse({score: 25});

// small/large straights score as 30/40
const smallStraight = new SmallStraight({score: 30 });
const largeStraight = new LargeStraight({ score: 40 });

// yahtzee scores as 50
// https://www.udemy.com/modern-react-bootcamp/learn/lecture/14375922?start=15#questions
// watch from 10:17 to 10:44
const yahtzee = new Yahtzee({ score: 50 });

// for chance, can view as some of all dice, requiring at least 0 of a kind
const chance = new SumDistro({ count: 0 });

export {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance
};
