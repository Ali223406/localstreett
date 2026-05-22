#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It deletes or moves the /app, /components, /hooks, /scripts, and /constants directories to /app-example based on user input and creates a new /app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require("fs");      // Import the fs module for file system operations, which will be used to create directories, move or delete existing directories, and write new files as part of the project reset process.
const path = require("path");
const readline = require("readline"); // Import the path module for handling file paths, which will be used to construct paths for the old directories, the new app directory, and the example directory. The readline module is imported to create an interface for reading user input from the command line, which will be used to ask the user whether they want to move existing files to /app-example or delete them during the reset process.

const root = process.cwd();
const oldDirs = ["app", "components", "hooks", "constants", "scripts"];  // Define the root directory as the current working directory and an array of old directories that will be moved or deleted during the reset process. These directories represent the existing structure of the project that will be reset to a blank state.
const exampleDir = "app-example";
const newAppDir = "app";
const exampleDirPath = path.join(root, exampleDir);

const indexContent = `import { Text, View } from "react-native"; 

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const rl = readline.createInterface({  // Create a readline interface to read user input from the command line. The input is set to process.stdin, which allows the script to read input from the terminal, and the output is set to process.stdout, which allows the script to write output back to the terminal. This interface will be used to ask the user whether they want to move existing files to /app-example or delete them during the reset process.
  input: process.stdin,
  output: process.stdout,
});

const moveDirectories = async (userInput) => {   // Define an asynchronous function called moveDirectories that takes the user's input as an argument. This function will handle the logic for moving existing directories to /app-example or deleting them based on the user's choice, as well as creating the new /app directory and its contents.
  try {
    if (userInput === "y") {
      // Create the app-example directory
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

    // Move old directories to new app-example directory or delete them
    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);
      if (fs.existsSync(oldDirPath)) {
        if (userInput === "y") {
          const newDirPath = path.join(root, exampleDir, dir);
          await fs.promises.rename(oldDirPath, newDirPath);
          console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
        } else {
          await fs.promises.rm(oldDirPath, { recursive: true, force: true });
          console.log(`❌ /${dir} deleted.`);
        }
      } else {
        console.log(`➡️ /${dir} does not exist, skipping.`);
      }
    }

    // Create new /app directory
    const newAppDirPath = path.join(root, newAppDir);
    await fs.promises.mkdir(newAppDirPath, { recursive: true });
    console.log("\n📁 New /app directory created.");

    // Create index.tsx
    const indexPath = path.join(newAppDirPath, "index.tsx");
    await fs.promises.writeFile(indexPath, indexContent);
    console.log("📄 app/index.tsx created.");

    // Create _layout.tsx
    const layoutPath = path.join(newAppDirPath, "_layout.tsx");
    await fs.promises.writeFile(layoutPath, layoutContent);
    console.log("📄 app/_layout.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      `1. Run \`npx expo start\` to start a development server.\n2. Edit app/index.tsx to edit the main screen.${
        userInput === "y"
          ? `\n3. Delete the /${exampleDir} directory when you're done referencing it.`
          : ""
      }`
    );
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`); // Log any errors that occur during the execution of the moveDirectories function, which could include issues with file system operations such as creating directories, moving or deleting files, or writing new files. The error message will provide details about what went wrong, allowing the user to troubleshoot and resolve any issues that arise during the project reset process.
  }
};

rl.question(
  "Do you want to move existing files to /app-example instead of deleting them? (Y/n): ",   // Prompt the user with a question asking whether they want to move existing files to /app-example instead of deleting them. The user's input will be read from the command line, and the response will determine whether the existing directories are moved or deleted during the reset process. The default answer is "Y" (yes), which means that if the user simply presses Enter without typing anything, the script will proceed with moving the existing files to /app-example.
  (answer) => {
    const userInput = answer.trim().toLowerCase() || "y";
    if (userInput === "y" || userInput === "n") {  // Check if the user's input is either "y" (yes) or "n" (no). If the input is valid, the moveDirectories function is called with the user's input as an argument to execute the appropriate actions based on their choice. If the input is invalid, an error message is logged, and the readline interface is closed without making any changes to the project.
      moveDirectories(userInput).finally(() => rl.close());
    } else {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      rl.close();
    }
  }
);
