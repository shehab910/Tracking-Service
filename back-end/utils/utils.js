const puppeteer = require("puppeteer");

const getSheinProdcutInfo = async (url) => {
   // This is where we'll put the code to get around the tests.
   const preparePageForTests = async (page) => {
      // Pass the User-Agent Test.
      const userAgent =
         "Mozilla/5.0 (X11; Linux x86_64)" +
         "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
      await page.setUserAgent(userAgent);
   };
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await preparePageForTests(page);

   //to block images
   await page.setRequestInterception(true);
   page.on("request", (req) => {
      if (
         req.resourceType() === "image" ||
         req.resourceType() === "font" ||
         req.resourceType() === "stylesheet"
      ) {
         req.abort();
      } else {
         req.continue();
      }
   });

   await page.goto(url);

   const productInfo = await page.evaluate(() => {
      return {
         imgsrc: document.body.querySelector("img").getAttribute("src"),
         title: document.body
            .querySelector(".product-intro__head-name")
            .textContent.trim(),
         price: document.body
            .querySelector(".product-intro__head-price")
            .textContent.trim(),
      };
   });
   browser.close();
   return productInfo;
};

module.exports = {
   getSheinProdcutInfo,
};
