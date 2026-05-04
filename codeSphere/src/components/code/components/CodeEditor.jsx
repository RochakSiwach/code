import Editor from "@monaco-editor/react";

export const STARTER_CODE = {
  javascript: `function welcome(name) {
  console.log("Hello, " + name);
}

welcome("Rahul");`,

  typescript: `type User = {
  name: string;
};

function welcome(user: User) {
  console.log("Hello, " + user.name);
}

welcome({ name: "Rahul" });`,

  python: `def welcome(name):
    print("Hello, " + name)

welcome("Rahul")`,

  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello from Java");
  }
}`,

  csharp: `using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello from C#");
    }
}`,

  php: `<?php
$name = "Rahul";
echo "Hello, " . $name;
`,
};

function CodeEditor({ language, code, setCode }) {
  return (
    <div className="editor-wrapper">
      <Editor
        height="500px"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 16 },
        }}
      />
    </div>
  );
}

export default CodeEditor;
