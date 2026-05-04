// import React from "react";

// const LanguageSelector = ({ language, onSelect }) => {
//   const languages = [
//     { javascript: "18.15.0" },
//     { python: "3.10.0" },
//     { php: "8.2.3" },
//     { java: "15.0.2" }
//   ];

//   return (
//     <div>
//       <p>Select Language</p>
//       <select value={language} onChange={(e) => onSelect(e.target.value)}>
//         {languages.map((langObj) => {
//           const [key, value] = Object.entries(langObj)[0];

//           return (
//             <option key={key} value={key}>
//               {key} {value}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//   );
// };

// export default LanguageSelector;

// export const LANGUAGE_VERSIONS = {
//   javascript: "18.15.0",
//   typescript: "5.0.3",
//   python: "3.10.0",
//   java: "15.0.2",
//   csharp: "6.12.0",
//   php: "8.2.3",
// };

// function LanguageSelector({ language, setLanguage }) {
//   return (
//     <div className="language-selector">
//       <label htmlFor="language">Language</label>

//       <select
//         id="language"
//         value={language}
//         onChange={(e) => setLanguage(e.target.value)}
//       >
//         {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
//           <option key={lang} value={lang}>
//             {lang} ({version})
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default LanguageSelector;









// code mirror 
export const LANGUAGE_OPTIONS = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "php",
];

function LanguageSelector({ language, setLanguage }) {
  return (
    <div className="language-selector">
      <label htmlFor="language">Language</label>

      <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {LANGUAGE_OPTIONS.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;