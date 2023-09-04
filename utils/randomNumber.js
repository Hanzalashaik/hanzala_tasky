function randomNumber(count) {
  let ran = 0;

  for (let i = 1; i <= count; i++) {
    ran = ran * 10 + Math.floor(Math.random() * 10);
  }
  return ran;
}
  export default randomNumber;