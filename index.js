#!/usr/bin/env node

import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import createDirectoryContents from "./createDirectoryContents.js";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import figlet from "figlet";
import gradient from "gradient-string";
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: "project-type-choice",
    type: "list",
    message: "What game type do you want?",
    choices: CHOICES,
  },
  {
    name: "project-name",
    type: "input",
    message: "Project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
];
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function ironhackBanner(message) {
  figlet(message, (err, data) => {
    console.log(gradient.pastel(data));
  });
}
async function welcomeTitle() {
  const rainbowTitle = chalkAnimation.rainbow(
    `Welcome Ironhacker! Let's build something cool`
  );
  await sleep(2500);
  rainbowTitle.stop();
  console.log(chalk.bgBlueBright(`First things first...`));
  await sleep(1000);
}

async function prompts() {
  const answers = await inquirer.prompt(QUESTIONS);
  const projectChoice = answers["project-type-choice"];
  const projectName = answers["project-name"];
  const templatePath = `${__dirname}/templates/${projectChoice}`;
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  const spinner = createSpinner("Creating your folder structure...").start();
  await sleep();

  spinner.success({
    text: `Here is your project template folder,
  Now you can...
 `,
  });

  const nextSteps = chalkAnimation.pulse(` 
cd ${projectName} 
and start coding`);
  await sleep();
  nextSteps.stop();
  createDirectoryContents(templatePath, projectName);
  const commentBanner = chalkAnimation.neon(
    `
    ***********  Remember to read all the comments! They are there to help :)  ***********`
  );
  await sleep(4000);
  commentBanner.stop();
  console.log(
    gradient.pastel(
      figlet.textSync("H a v e  f u n !", {
        font: "Dancing Font",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 220,
        whitespaceBreak: true,
      })
    )
  );
}
await ironhackBanner("Iron - Game");
await sleep(1000);
await welcomeTitle();
await prompts();
