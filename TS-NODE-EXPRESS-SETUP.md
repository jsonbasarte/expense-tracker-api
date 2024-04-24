Reference: https://blog.logrocket.com/how-to-set-up-node-typescript-express/

1. Create a package.json file
    -mkdir ts-node-express
    -cd ts-node-express/
    -npm init -y

2. Create a minimal server with Express
    - npm i express dotenv
    - The DotEnv package is utilized to read environment variables from the .env file. Instead of hardcoding environment-specific variables directly into the app, include them all in this file and utilize the DotEnv package to manage them.
    - Then, create a directory called src at the project’s root to keep our application source files organized. Add a new file named index.js to it and populate it with the following code, incorporating the previously defined environmental variable:
    - // src/index.js
    const express = require('express');
    const dotenv = require('dotenv');

    dotenv.config();

    const app = express();
    const port = process.env.PORT;

    app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
    });

    app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    });

3. Installing TypeScript
    - Begin by installing TypeScript as a development dependency. Additionally, we’ll install the @types declaration packages for Express and Node.js, which offer type definitions in the form of declaration files.

    Declaration files, typically with the .d.ts extension, serve as predefined modules that outline the structure of JavaScript values or the types present for the TypeScript compiler. These declaration files are available for libraries originally written in JavaScript, not TypeScript.

    The DefinitelyTyped GitHub repository maintains the TypeScript type definitions for direct use in Node.js and other JavaScript projects, sparing you the effort of defining these types from scratch. To incorporate types or declaration files for a specific library or module, seek packages starting with the @types namespace.

    npm i -D typescript @types/express @types/node

    The -D or the --dev flag directs the package manager to install these libraries as development dependencies.

4. Generating tsconfig.json
    - Every TypeScript project utilizes a configuration file to manage various project settings. The tsconfig.json file, which serves as the TypeScript configuration file, outlines these default options and offers the flexibility to modify or customize compiler settings to suit your needs.

    The tsconfig.json file is usually placed at the project’s root. To generate this file, use the following tsc command, initiating the TypeScript Compiler:

    npx tsc --init

    Upon opening the tsconfig.json file, you’ll notice several other commented-out compiler options. Among all these options, compilerOptions is a mandatory field that must be specified. Here’s a summary of all the default options that belong inside the compilerOptions field:

    - target: Enables the specification of the target JavaScript version that the compiler will output
    - module: Facilitates the utilization of a module manager in the compiled JavaScript code, CommonJS is supported and is a standard in Node.js
    - strict: Toggles strict type-checking protocols
    - esModuleInterop: Enables the compilation of ES6 modules to CommonJS modules
    - skipLibCheck: When set to true, bypasses type-checking of default library declaration files
    - forceConsistentCasingInFileNames: When set to true, enforces case-sensitive file naming
    One crucial option you will need to enable is outDir, which determines the destination directory for the compiled output. Locate this option in the tsconfig.json file and uncomment it.

    By default, the value of this option is set to the project’s root. Change it to dist, as shown below:

    {
    "compilerOptions": {
        ...
        "outDir": "./dist"
        ...
    }
    }
    While there are probably other configuration options you can add to the TypeScript compiler, the options above are basic specifications that can help you get started.

5. Create an Express server with a .ts extension
    Transforming our JavaScript Express server code into TypeScript isn’t as complicated as it may seem. Begin by renaming the file from index.js in the src directory to index.ts. The .ts extension indicates a TypeScript file, and it will be compiled into JavaScript when we build the application later.

    Now, open the index.ts file and add the following modifications to make it TypeScript-compatible:

    // src/index.ts
    import express, { Express, Request, Response } from "express";
    import dotenv from "dotenv";

    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT || 3000;

    app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
    });

    app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    });

    No additional changes are made to the code except for including some TypeScript types. Refer to the documented version of the above code for a more detailed overview of what’s happening.

    Now, if you attempt to execute the index.ts file using Node, similar to what we did with our index.js file, you will encounter an error:

    This is because Node doesn’t inherently support the direct execution of TypeScript files. The next section discusses running TypeScript files in the terminal using a Node package.

6. Running TypeScript in Node with ts-node
    As previously discussed, executing a TypeScript file in Node is not supported by default. However, we can overcome this limitation by leveraging ts-node, a TypeScript execution environment for Node. Let’s first use ts-node with npx without installing it as a dependency and observe the output:

    npx ts-node src/index.ts

    The main advantage of using ts-node is that it eliminates the extra step of code transpilation and allows you to work with TypeScript code directly in a Node.js environment. It also comes in handy when working with standalone TypeScript files in the Node terminal.

7. Watching file changes
    To enhance the development workflow for Node.js projects, I often use nodemon, a utility library that automatically restarts a Node-based application upon detecting file changes in the specified directories.

    Another useful package you might consider is concurrently, which facilitates the execution of multiple commands, such as nodemon, npx, tsc, etc., allowing you to combine different functionalities. However, for this simple app demonstration, we won’t be incorporating it at this stage.

    We will also install ts-node as a development dependency to further enhance the workflow. This way, nodemon automatically picks up ts-node to streamline the development process. Execute the following command to integrate nodemon and ts-node as development dependencies:

    npm i -D nodemon ts-node
    After installing these dev dependencies, update the scripts in the package.json file as follows:

    {
    "scripts": {
        "build": "npx tsc",
        "start": "node dist/index.js",
        "dev": "nodemon src/index.ts"
    }
    }
    - Referring to the added script modifications above, the build command compiles the code into JavaScript and saves it in the dist directory using the TypeScript Compiler (tsc). The dev command is designed to run the Express server in development mode with the help of nodemon and ts-node.

    - Taking an extra step for a more refined setup, you may consider a nodemon.json file in the project root, which serves as a configuration file for nodemon. This file lets you specify directories and extensions to watch and define commands to execute, while nodemon manages the reloading of the application upon changes:

    {
    "watch": ["src"],
    "ext": "ts",
    "exec": "concurrently \"npx tsc --watch\" \"ts-node src/index.ts\""
    }

    - It’s crucial to note that combining the TypeScript Compiler command in watch mode with ts-node or any other command, as demonstrated above in the nodemon configuration or with the bodemon command itself, may result in a loss of logging information.

    - This is due to both nodemon and TSC concurrently monitoring changes and potentially competing to display their respective logs on the screen.

8. Building or transpiling the TypeScript files
    - In a TypeScript project, transpiling or building involves the TypeScript Compiler (TSC) interpreting the tsconfig.json file to determine how to convert TypeScript files into valid JavaScript.

    - To compile the code, you must execute the command npm run build. Upon successfully executing this command for the first time, a new dist directory is created in the project root.
    If you designate any other directory as the value for the outDir field in the tsconfig.json file, that specified directory would be reflected here instead of dist.

    To improve this process further, set up TypeScript for reliability with strict type checking and configurations that adapt to your needs. Make the most of the tsconfig.json file by specifying the best suitable production settings for your project. Improve performance with code splitting by utilizing tools like Webpack for efficiency and shrink file sizes with tools like Terser.

    As the project expands, ensure code stability through automated testing with tools like Jest and streamline the workflow from development to production with CI/CD pipelines.