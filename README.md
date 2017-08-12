## WNPC - Wireless Network Pattern Classifier

Wireless Network Pattern Classifier is a data processing software use to estimate a wireless network congestion and traffic by using a Random Forest Classifier as a supervised learning to let the machine automatically generate out a result.

This application is an enhancement application for Wireless Network Analyzer project from: https://github.com/GuytChome/WNA.

List of other packages we import and use in this project.

1.csvtojson 	Publisher:keyang, 	from:https://www.npmjs.com/package/csvtojson.

2.delay		Publisher:sindresorhus, from:https://www.npmjs.com/package/delay.

3.jsonfile	Publisher:ryanzim,	from:https://www.npmjs.com/package/jsonfile.

4.RFC		Publisher:Jessfraz,	from:https://github.com/jessfraz/random-forest-classifier.


### Installation

1. Install WNA based on installation guide from https://github.com/GuytChome/WNA
2. Download this project and extract it into a home directory or clone this repository by using this code.

```bash
$ git clone https://github.com/tjb16147/WNPC.git
```

3. Install necessary npm listed below.

```bash
$ cd WNPC
$ sudo npm install random-forest-classifier
$ sudo npm install --save jsonfile
$ sudo npm i --save csvtojson
$ sudo npm install --save delay
```



### Usage

To run an application, run main.js in folder via terminal after finish capturing packet frames from WNA.

```bash
$ cd WNPC
$ node main.js
```
After application is done, output will be displayed in terminal.


