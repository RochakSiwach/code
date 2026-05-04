// import axios from "axios";
// import { LANGUAGE_VERSIONS } from "./components/LanguageSelector";

// const piston = axios.create({
//   baseURL: "https://emkc.org/api/v2/piston",
// });

// export async function runProgram(language, sourceCode) {
//   const response = await piston.post("/execute", {
//     language,
//     version: LANGUAGE_VERSIONS[language],
//     files: [{ content: sourceCode }],
//   });

//   return response.data;
// }



// import axios from "axios";

// const pistonApi = axios.create({
//   baseURL: "http://127.0.0.1:2000/api/v2",
// });

// export const runProgram = async (language, sourceCode) => {
//   const response = await pistonApi.post("/execute", {
//     language,
//     version: "*",
//     files: [
//       {
//         content: sourceCode,
//       },
//     ],
//   });

//   return response.data;
// };











//code mirror
export const runProgram = async (language, sourceCode) => {
  if (language !== "javascript") {
    return {
      run: {
        output: `${language} select ho gayi hai, lekin browser-only mode me abhi sirf javascript run hogi.`,
        stderr: "",
      },
    };
  }

  try {
    const logs = [];

    const customConsole = {
      log: (...args) => logs.push(args.join(" ")),
    };

    const runner = new Function("console", sourceCode);
    runner(customConsole);

    return {
      run: {
        output: logs.length ? logs.join("\n") : "Code executed successfully.",
        stderr: "",
      },
    };
  } catch (error) {
    return {
      run: {
        output: "",
        stderr: error.message,
      },
    };
  }
};