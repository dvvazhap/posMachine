
const { config } = require("../config.js");
// console.log(printerName, printerWidth);
const { PosPrinter } = require("@alvarosacari/electron-pos-printer");
const printOptions = {
  preview: false, // Preview in window or print
  width: config.printerWidth, //  width of content body
  margin: "0 0 0 0", // margin of content body
  copies: 1, // Number of copies to print
  printerName: config.printerName, // printerName: string, check it at webContent.getPrinters()
  timeOutPerLine: 400,
  silent: true,
};

const data = [
  // {
  //   type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
  //   value: "||---",
  //   style: `text-align:left;`,
  //   css: { "font-size": "12px" },
  // },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Meenchatti",
    style: `text-align:center;`,
    css: { "font-weight": "700", "font-size": "18px" },
  },
  // {
  //   type: "image",
  //   path: path.join(__dirname, "assets/img_test.png"), // file path
  //   position: "center", // position of image: 'left' | 'center' | 'right'
  //   width: "auto", // width of image in px; default: auto
  //   height: "60px", // width of image in px; default: 50 or '50px'
  // },
  // {
  //   type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
  //   value:
  //     "Hello World from Printer",
  //   style: `text-align:left;`,
  //   css: {
  //     "font-size": "12px",
  //     "font-family": "sans-serif"
  //   },
  // },
  // {
  //   type: "barCode", // Do you think the result is ugly? Me too. Try use an image instead...
  //   value: "https://farmersmeenchatti.in",
  //   height: 12,
  //   width: 1,
  //   displayValue: true, // Display value below barcode
  //   fontsize: 8,
  // },
  // {
  //   type: "qrCode",
  //   value: "http://www.farmersmeenchatti.in/",
  //   height: 100,
  //   width: 100,
  //   // style: "margin-left:0px",
  //   position: "center",
  //   // style: `text-align:center;`,
  // }
];

// const now = {
//   type: "text",
//   value: "" + date(),
//   style: `text-align:center;`,
//   css: { "font-size": "12px", "font-family": "sans-serif" },
// };

// const d = [...data, now];
const printData = [...data];

exports.print = () =>{
  console.log("....d", printData);
  PosPrinter.print(printData, printOptions)
    .then(() => { })
    .catch((error) => {
      console.error(error);
    });
  return true;
}

