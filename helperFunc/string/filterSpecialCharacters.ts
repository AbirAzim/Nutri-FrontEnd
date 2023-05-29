export function filterCharacter(str: string) {
  // First set a mode
  let pattern = new RegExp(
    "[`~!@#$^&*()=：”“'。，、？|{}':;'%,\\[\\].<>/?~！@#$……&*（）&;—|{ }【】‘；]",
  );
  let resultStr1 = "";
  for (let j = 0; j < str.length; j++) {
    // Mainly through replace, pattern rules to replace characters with empty and finally spliced in resultStr1
    resultStr1 = resultStr1 + str.substr(j, 1).replace(pattern, "");
  }
  // When the loop ends, return the final result resultStr1
  return resultStr1;
}

// Example
//filterCharacter("gyaskjdhy12316789#$%^&!@#1=123,./["); // Result: gyaskjdhy123167891123
