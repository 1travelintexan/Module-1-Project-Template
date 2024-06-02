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
const sleep = (ms = 2500) => new Promise((r) => setTimeout(r, ms));
async function ironhackBanner() {
  const msg = "Iron - Game";
  figlet(msg, (err, data) => {
    console.log(gradient.pastel(data));
  });
}
async function welcomeTitle() {
  const rainbowTitle = chalkAnimation.rainbow(
    `Welcome Ironhacker! Let's build something cool`
  );
  await sleep();
  rainbowTitle.stop();
  console.log(chalk.bgBlueBright(`First I need to know a few things`));
  await sleep();
}

async function prompts() {
  const answers = await inquirer.prompt(QUESTIONS);
  const projectChoice = answers["project-type-choice"];
  const projectName = answers["project-name"];
  const templatePath = `${__dirname}/templates/${projectChoice}`;
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  const spinner = createSpinner("Creating your folder structure...").start();
  await sleep();

  chalkAnimation.neon(
    `
    ***********remember to read all the comments! They are there to help :)***********`
  );
  spinner.success({
    text: `Here is the project template that you requested,
    Now you can... 

    cd into ${projectName} and start coding :)`,
  });

  createDirectoryContents(templatePath, projectName);
}
await ironhackBanner();
await sleep(1000);
await welcomeTitle();
await prompts();
