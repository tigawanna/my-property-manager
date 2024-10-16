import React from "react";

// function component
function AnimatedCard({
  animation,
  digit,
}: {
  animation: "fold" | "unfold";
  digit: number;
}){
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

// function component
function StaticCard({ position, digit }: { position: "upperCard"|"lowerCard"; digit: number }){
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

// function component
function FlipUnitContainer({ digit, shuffle, unit }:{digit:number;shuffle:boolean;unit:string}){
  // assign digit values
  let currentDigit = digit;
  let previousDigit = digit - 1;

  // to prevent a negative value
  if (unit !== "hours") {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }

  // add zero
  if (currentDigit < 10) {
    // @ts-expect-error : number is being converted into a string to append the 0
    currentDigit = `0${currentDigit}`;
  }
  if (previousDigit < 10) {
    // @ts-expect-error : number is being converted into a string to append the 0
    previousDigit = `0${previousDigit}`;
  }

  // shuffle digits
  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;

  // shuffle animations
  const animation1 = shuffle ? "fold" : "unfold";
  const animation2 = !shuffle ? "fold" : "unfold";

  return (
    <div className={"flipUnitContainer md:w-[50%] flex-grow"}>
      <StaticCard position={"upperCard"} digit={currentDigit} />
      <StaticCard position={"lowerCard"} digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  );
};




// class component
export function FlipClock(){
  const time = new Date();
  const [hours, setHours] = React.useState(time.getHours());
  const [hoursShuffle, setHoursShuffle] = React.useState(true);
  const [minutes, setMinutes] = React.useState(time.getMinutes());
  const [minutesShuffle, setMinutesShuffle] = React.useState(true);
  const [seconds, setSeconds] = React.useState(time.getSeconds());
  const [secondsShuffle, setSecondsShuffle] = React.useState(true);

  React.useEffect(() => {
    const timerID = setInterval(() => updateTime(), 50);
    return () => clearInterval(timerID);
  }, []);

  const updateTime = () => {
    // get new date
    const time = new Date();
    // set time units
    const newHours = time.getHours();
    const newMinutes = time.getMinutes();
    const newSeconds = time.getSeconds();
    // on hour chanage, update hours and shuffle state
    if (newHours !== hours) {
      setHoursShuffle(!hoursShuffle);
      setHours(newHours);
    }
    // on minute chanage, update minutes and shuffle state
    if (newMinutes !== minutes) {
      setMinutesShuffle(!minutesShuffle);
      setMinutes(newMinutes);
    }
    // on second chanage, update seconds and shuffle state
    if (newSeconds !== seconds) {
      setSecondsShuffle(!secondsShuffle);
      setSeconds(newSeconds);
    }
  };
//   console.log({hours, minutes, seconds});
  return (
    <div className={"flipClock"}>
      <FlipUnitContainer
        key={hours}
        unit={"hours"}
        digit={hours}
        shuffle={hoursShuffle}
      />
      <FlipUnitContainer
        key={minutes}
        unit={"minutes"}
        digit={minutes}
        shuffle={minutesShuffle}
      />
      <FlipUnitContainer
        key={seconds}
        unit={"seconds"}
        digit={seconds}
        shuffle={secondsShuffle}
      />
    </div>
  );
};

