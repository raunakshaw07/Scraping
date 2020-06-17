const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const writeStream = fs.createWriteStream("trimmers.csv");

// Write Head
writeStream.write(`Name, Rating, Current_Price, Original_Price, Discount\n`);

request(
  "https://www.flipkart.com/health-personal-care-appliances/personal-care-appliances/trimmers/pr?count=40&p%5B%5D=facets.fulfilled_by%255B%255D%3DFlipkart%2BAssured&sid=zlw%2F79s%2Fby3&p%5B%5D=facets.ideal_for%255B%255D%3DMen&p%5B%5D=facets.ideal_for%255B%255D%3DMen%2B%2526%2BWomen&p%5B%5D=facets.brand%255B%255D%3DPhilips&fm=neo%2Fmerchandising&iid=M_fb109daa-c7a7-471f-a5df-fa7fef4f517f_16.SE6VYY3Q3VJY&ppt=hp&ppn=homepage&ssid=smrw9420bk0000001592307011584&otracker=hp_omu_Best%2Bof%2BElectronics_5_13.dealCard.OMU_Best%2Bof%2BElectronics_SE6VYY3Q3VJY_8&otracker1=hp_omu_WHITELISTED_neo%2Fmerchandising_Best%2Bof%2BElectronics_NA_dealCard_cc_5_NA_view-all_8&cid=SE6VYY3Q3VJY",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $("._3liAhj").each((i, el) => {
        const name = $(el).find("._2cLu-l").text();

        const rating = $(el).find(".hGSR34").text();

        const curPrice = $(el).find("._1vC4OE").text().replace(",", "");

        const orgPrice = $(el).find("._3auQ3N").text().replace(",", "");

        const discount = $(el).find(".VGWI6T").text();

        writeStream.write(
          `${name}, ${rating}, ${curPrice}, ${orgPrice}, ${discount}\n`
        );
      });
      console.log("Scraping Done");
    }
  }
);
