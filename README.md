# substack CLI


## Motivation

To facilitate interaction with substack

## Installation

Add it to your computer `npm install substack-site-cli -g` or `yarn add substack-site-cli -g`

To ensure subc is installed properly, run the following command:

```sh
substack -V
```

And you will see the version of the current txc installation:

```sh
my-user@my-machine:~/$ txc -V
0.0.1
```

## Usage

After installation the application will be available through the command `substack` and will provide the next set of commands:

### 1. Init

This command will initialize the CLI so you can execute other commands:

```sh
substack init --cookie "<copy and paste the substack cookie here>" --domain "<your newsletter site domain>"
```

### 1. Subscribers

This command will allow you to export your subscribers as `CSV` or `JSON`, you will be prompted several questions

```sh
substack subcribers
```