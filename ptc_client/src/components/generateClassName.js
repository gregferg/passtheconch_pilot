export default function generateClassName(otherClasses, isNavigating) {
  if (isNavigating) {
    return otherClasses + " navigate-away";
  } else {
    return otherClasses;
  }
}
