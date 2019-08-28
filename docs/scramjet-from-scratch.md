# Use scramjet from scratch

This guide shows how to start using scramjet from scratch - meaning on a bare os. With this guide you'll be able to create and execute your own `scramjet` pipeline on any server or computer

**Step 1: Install prerequisites**

Scramjet is based on [node.js](https://www.nodejs.org), so we'll need to install that before scramjet - the easiest way to do that is using `nvm` so first install that:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
source ~/.bashrc # you can restart your terminal as well.
```

`nvm` is a cool little tool that allows you to automatically install node.js on a machine - all you need is ssh access, not even root access is needed.

There's a [windows version of nvm here](https://github.com/coreybutler/nvm-windows). It has some small differences, but I hope this guide does work with it too. If not - [please report an issue](https://github.com/signicode/scramjet/issues)

Next we need to install the current version of node, or any you like - `scramjet` is compatible with all supported node versions (currently 8, 10, 12).

```sh
nvm install node # instead of node you can set this to any version you like, 8.16.0 for instance.
```

And now you'll have `node` up and running in order to confirm that let's try:

```sh
node -v
# v12.8.0
```

**Step 2: create a node project**

There's a lot of IDE's out there - I'd recommend [VSCode](https://code.visualstudio.com/) and GitHub's [Atom](https://atom.io/). There's some who'd prefer [Webstorm](https://www.jetbrains.com/webstorm/) or [Sublime](https://www.sublimetext.com/) and those who can **actually** exit [`vim`](https://www.vim.org/) without restarting the whole server - in the end you will need a good text editor and who am I to judge? Choose your weapon of choice and let's now start cracking:

First let's create a directory and enter it (I'll use command line, but if you're using the IDE's browser of `Nautilus` that's fine too):

```sh
mkdir ~/src/my-workflow/
cd ~/src/my-workflow/
```

That done we need to create a node package. This is not a necessary step, but it'll allow us to share our work with other later.

```sh
npm init # now we'll be asked a couple questions - about name etc. It's ok to just keep pressing enter.
```

After that you'll see a new file called `package.json` that will hold out package data. Now let's install `scramjet`:

```sh
npm install --save scramjet # this installs and adds scramjet to package.json so others know it's needed to run
```

Now after that's done we can create a simple scramjet workflow in a javascript file - for instance `index.js` - for example lets download a list of files fetched from an external server:

```javascript
#!/usr/bin/env node
// the first line above allows us to execute this file

const {StringStream} = require('scramjet');
const {get: get_} = require('https');
const {createWriteStream} = require('https');

// here's a simple wrapper to fetch stream from any server - you can use this or axios, request or node-fetch.
const get = (url, options = {}) => new Promise(resolve => get(url, options, resolve));

StringStream.from(async () => get('https://www.some.server.net/some.file.txt')))
    .lines()
    .parse(x => x.split('\t'))
    .map(async ([url, data, name]) => [await get(`${url}?${data}`), name])
    .each(([name]) => console.log(`downloading ${name}...`))
    .each(([data, name]) => new Promise((resolve, reject) => createWriteStream(name).on('finish', resolve).on('error', reject)))
        // the cool thing here is that you're writing a couple files at the same time
        // see the docs (www.scramjet.org) for `maxParallel`.
    .each(([name]) => console.log(`downloaded ${name}.`))
    .run()
    .catch(e => {
        console.error(e.stack);
        throw e;
    });
```

Now let's allow to execute the file (you don't need to do that on Windows) by running `chmod +x index.js` and now we can run this:

```sh
./index.js
```
