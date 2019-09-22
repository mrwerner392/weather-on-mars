// Fetch NASA Weather API
// api key: COCIGDGp6Pfcbdgc5tTfWnmnFdcj05QtLcxJOOgm
// api url: https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
// live url: https://api.nasa.gov/insight_weather/?api_key=COCIGDGp6Pfcbdgc5tTfWnmnFdcj05QtLcxJOOgm&feedtype=json&ver=1.0
const wrapper = document.querySelector(".content-wrapper")
const scroll = document.querySelector(".scroll")

fetch("https://api.nasa.gov/insight_weather/?api_key=COCIGDGp6Pfcbdgc5tTfWnmnFdcj05QtLcxJOOgm&feedtype=json&ver=1.0")
  .then(response => response.json())
  .then(json => {
    const solKeys = json["sol_keys"];
    // console.log(solKeys)
    solKeys.forEach((solDay) => {
      if (json[solDay]) {

        // Create p tags for the pieces of data for this Mars sol
        let avgTempPTag = createPTag(json[solDay], pullAvgTemp, "Avg Temp", "F", "C", " | ");
        let minTempPTag = createPTag(json[solDay], pullMinTemp, "Min Temp", "F", "C", " | ");
        let maxTempPTag = createPTag(json[solDay], pullMaxTemp, "Max Temp", "F", "C", " | ");
        let windSpeedPTag = createPTag(json[solDay], pullWindSpeed, "Wind Speed", "m/s", "MpH", " | ");
        let windDirPTag = createPTag(json[solDay], pullWindDir, "Wind Direction", "", "", "");

        // Create a div for this Mars sol
        let solDiv = document.createElement("div");
        solDiv.id = `${solDay}-div`;
        solDiv.classList.add("sol-div");

        // Create a div for the weather data within the div for this Mars sol
        let dataDiv = document.createElement("div");
        dataDiv.id = `${solDay}-data-div`;
        dataDiv.classList.add("sol-data-div");

        // Create a title for this Mars sol div
        let divTitle = document.createElement("h1");
        divTitle.innerText = `Sol ${solDay}`;

        // Append title to this Mars sol div
        solDiv.append(divTitle);

        // Append weather p tags to the weather data div
        dataDiv.append(avgTempPTag, minTempPTag, maxTempPTag, windSpeedPTag, windDirPTag);

        // Append weather data div to this Mars sol div
        solDiv.append(dataDiv);

        // Append this Mars sol div to the content wrapper
        let mainDiv = document.querySelector('.content-wrapper');
        mainDiv.append(solDiv);
      };
    });
  });


const pullAvgTemp = dayObj => `${dayObj.AT.av}°`;
const pullMinTemp = dayObj => `${dayObj.AT.mn}°`;
const pullMaxTemp = dayObj => `${dayObj.AT.mx}°`;
const pullWindSpeed = dayObj => dayObj.HWS.av;
const pullWindDir = dayObj => dayObj.WD.most_common.compass_point;
// const pullWindDeg = dayObj => dayObj.WD.most_common.compass_degrees

const createPTag = (dayObj, func, label, unit1, unit2, seperator)  => {
  let funcValue = func(dayObj);
  let pTag = document.createElement("p");
  let unit1Span = document.createElement("span");
  let unit2Span = document.createElement("span");
  let pipe = document.createElement("span");
  pipe.innerText = seperator;
  unit1Span.innerText = unit1;
  unit2Span.innerText = unit2;
  if (unit1 !== "") {
    unit1Span.classList.add(unit1);
    unit2Span.classList.add(unit2);
  };

  pTag.innerText = `${label}:  ${funcValue} `;

  pTag.append(unit1Span, pipe, unit2Span);
  return pTag;
};

// Scroll page horizonatally on vertical user scroll
wrapper.addEventListener("mousewheel", mouseWheelHandler);

function mouseWheelHandler(e) {
  e.preventDefault();

  // Scroll only on vertical user scroll
  if (e.deltaX === 0) {

    // How far to move the content
    let delta = 10 * e.deltaY;

    // Set the new horizontal position for the content
    let position = wrapper.scrollLeft + delta;

    // Move content to new position
    wrapper.scrollLeft = position;
  }

  // // Include horizontal user scroll in scroll delta
  // let delta = 0;
  //
  // if (e.deltaX >= 0 && e.deltaY >=0) {
  //   delta = Math.sqrt((e.deltaX ** 2) + (e.deltaY ** 2));
  // } else if (e.deltaX <= 0 && e.deltaY <= 0) {
  //   delta = -Math.sqrt((e.deltaX ** 2) + (e.deltaY ** 2));
  // };
  //
  // // Set the new horizontal position for the content
  // let position = wrapper.scrollLeft + delta;
  //
  // // Move content to new position
  // wrapper.scrollLeft = position;
  // }

}
