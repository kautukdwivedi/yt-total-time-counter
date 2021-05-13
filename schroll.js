function convertHMS(timeString){
  const arr = timeString.split(":");
  const seconds = arr[0]*3600+arr[1]*60+(+arr[2]);
  return seconds;
}
console.log(convertHMS("10:0"));