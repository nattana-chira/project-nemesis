import classNames from "classnames";
import { createArray } from "../classes/Utils";
import { Fragment } from "react";

export const transDiceName = (diceName) => {
  if (diceName === "red")
    return "ลูกเต๋าแดง"

  if (diceName === "blue")
    return "ลูกเต๋าฟ้า"

  if (diceName === "noise")
    return "ลูกเต๋า Noise"
}

export default function DiceComponent({ showDice, rollDiceClicked }) {
  function rollDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    const result = []

    dice.forEach((die) => {
      toggleClasses(die);
      const randomNumber = getRandomNumber(1, 6);
      result.push(randomNumber)
      console.log(randomNumber);
      die.dataset.roll = randomNumber;
    });

    console.log("rollDice")
    rollDiceClicked(result)
  }
  
  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }
  
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }  

  // document.getElementById("die-list").onclick = rollDice

  return (
  <div class="dice">

    {showDice === "red" && (
      <ol class={classNames("die-list", { "even-roll": 0 % 2 === 0, "odd-roll": 0 % 2 !== 0   })} data-roll="1" id={`die-${0}`} onClick={rollDice}>
        <li class="die-item" data-side="1">
          <div></div>
        </li>
        <li class="die-item" data-side="2">
          <img className="dice-icon dice-creeper" src="img/icon_alien_creeper.png" />
        </li>
        <li class="die-item" data-side="3">
          <img className="dice-icon dice-adult" src="img/icon_alien_adult.png" />
        </li>
        <li class="die-item" data-side="4">
          <img className="dice-icon dice-creeper" src="img/icon_alien_creeper.png" />
        </li>
        <li class="die-item" data-side="5">
          <img className="dice-icon dice-crosshair-5" src="img/dice_crosshair.png" />
        </li>
        <li class="die-item" data-side="6">
          <img className="dice-icon dice-crosshair-6-1" src="img/dice_crosshair.png" />
          <img className="dice-icon dice-crosshair-6-2" src="img/dice_crosshair.png" />
        </li>
      </ol>
    )}

    {showDice === "blue" && (
      <ol class={classNames("die-list", { "even-roll": 0 % 2 === 0, "odd-roll": 0 % 2 !== 0   })} data-roll="1" id={`die-${0}`} onClick={rollDice}>
        <li class="die-item-blue" data-side="1">
          <div></div>
        </li>
        <li class="die-item-blue" data-side="2">
          <img className="dice-icon dice-creeper" src="img/icon_alien_creeper.png" />
        </li>
        <li class="die-item-blue" data-side="3">
          <img className="dice-icon dice-adult" src="img/icon_alien_adult.png" />
        </li>
        <li class="die-item-blue" data-side="4">
          <img className="dice-icon dice-action-cost-4" src="img/dice_icon_1_action.png" />
          <img className="dice-icon dice-crosshair-blue-4" src="img/dice_crosshair.png" />
        </li>
        <li class="die-item-blue" data-side="5">
          <img className="dice-icon dice-crosshair-blue-5-1" src="img/dice_crosshair.png" />
          <img className="dice-icon dice-action-cost-5" src="img/dice_icon_1_action.png" />
          <img className="dice-icon dice-crosshair-blue-5-2" src="img/dice_crosshair.png" />
        </li>
        <li class="die-item-blue" data-side="6">
          <img className="dice-icon dice-crosshair-6-1" src="img/dice_crosshair.png" />
          <img className="dice-icon dice-crosshair-6-2" src="img/dice_crosshair.png" />
        </li>
      </ol>
    )}

    {showDice === "noise" && (
      <Fragment>
        <ol class={classNames("die-list", { "even-roll": 0 % 2 === 0, "odd-roll": 0 % 2 !== 0   })} data-roll="1" id={`die-${0}`} onClick={rollDice}>
          <li class="die-item-yellow" data-side="1">
            <div className="dice-icon dice-number">1</div>
          </li>
          <li class="die-item-yellow" data-side="2">
            <div className="dice-icon dice-number">2</div>
          </li>
          <li class="die-item-yellow" data-side="3">
            <div className="dice-icon dice-number">3</div>
          </li>
          <li class="die-item-yellow" data-side="4">
            <div className="dice-icon dice-number">4</div>
          </li>
          <li class="die-item-yellow" data-side="5">
            <img className="dice-icon dice-danger" src="img/icon_danger.png" />
          </li>
          <li class="die-item-yellow" data-side="6">
            <div className="dice-icon dice-number-silence">X</div>
          </li>
        </ol>
        <ol class={classNames("die-list", { "even-roll": 1 % 2 === 0, "odd-roll": 1 % 2 !== 0   })} data-roll="1" id={`die-${1}`} onClick={rollDice}>
          <li class="die-item-yellow" data-side="1">
            <img className="dice-icon dice-danger" src="img/icon_danger.png" />
          </li>
          <li class="die-item-yellow" data-side="2">
            <img className="dice-icon dice-danger" src="img/icon_danger.png" />
          </li>
          <li class="die-item-yellow" data-side="3">
            <img className="dice-icon dice-danger" src="img/icon_danger.png" />
          </li>
          <li class="die-item-yellow" data-side="4">
            <div className="dice-icon dice-number-silence">X</div>
          </li>
          <li class="die-item-yellow" data-side="5">
            <div className="dice-icon dice-number-silence">X</div>
          </li>
          <li class="die-item-yellow" data-side="6">
            <div className="dice-icon dice-number-silence">X</div>
          </li>
        </ol>
      </Fragment>
    )}
  </div>
  )
}