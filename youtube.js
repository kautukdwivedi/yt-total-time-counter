const puppeteer = require("puppeteer");

let page;

let url = process.argv[2];
(async function () {
  let broswer = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  let pages = await broswer.pages();

  page = pages[0];
  await page.goto(url);

  await page.evaluate(function () {
    function convertHMS(str) {
      var p = str.split(":"),
        s = 0,
        m = 1;

      while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
      }

      return s;
    }
    let tvids = document.querySelector(
      "#stats .style-scope.yt-formatted-string"
    );
    let scroll = Math.ceil(Number(tvids.innerText) / 100);
    let interval = setInterval(function () {
      let vids = document.querySelectorAll(
        ".yt-simple-endpoint.style-scope.ytd-playlist-video-renderer"
      );
      vids[vids.length - 1].scrollIntoView();
      if (scroll == Math.ceil(vids.length / 100)) {
        clearInterval(interval);
        let time = document.querySelectorAll(
          "span[class ='style-scope ytd-thumbnail-overlay-time-status-renderer']"
        );
        let totaltime = 0;
        for (let i = 0; i < time.length; i++) {
          totaltime += convertHMS(time[i].innerText);
        }
        console.log(totaltime / 3600);
      }
    }, 5000);
  });
})();
