# VERIZON Emoji-Bot

* Recognizer emojis
* Generate gif with user's emojis
* Analytics of all user actions
* Share on facebook gif

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Active branches

Production branch `master`
Staging branch `staging`
Developer branch `develop`

### Prerequisites
 
* node version `>= 10.13.0`
* npm version `>=5.7.1` 

### Installing

```
$ git init
$ git clone git@github.com:Jam3/prj-3-386-verizon-emoji.git
$ cd prj-3-386-verizon-emoji
$ npm install
```


### Environment Variables
Create `.env` from `.env.example`
```
cp .env.example .env
edit .env
```
/var/lib/jenkins/workspace/verizon-emoji-dev/secrets/secrets.yml
/var/lib/jenkins/workspace/verizon-emoji-stage/secrets/secrets.yml
/var/lib/jenkins/workspace/verizon-emoji-production/secrets/secrets.yml

### Connect to Facebook
1. Create app (https://developers.facebook.com/docs/apps/) and connect to messenger
2. Generate Token Access Page and copy for .env

### Running

You can use both [ngrok](https://ngrok.com) or [serveo](https://serveo.net) during development.

```
$ cd prj-3-386-verizon-emoji
$ npm start
```
### Deployment
1. Add changes to the correct branch
2. Go to the Jenkins (http://verizon-jenkins.mocstage.com:8080)
3. Push button "Build now" 
  
Troubleshooting guide (https://wiki.jenkins.io/display/JENKINS/Troubleshooting)  


### Accounts
1. AWS accounts
2. Dialogflow
3. FB app
4. FB page
5. Jenkins



## Authors

* **Daria Vynohradina Project Manager**
* **Valentyn Mezentsev developer**
* **Vladyslav Yarovyi developer**
* **Iurii Dziuban developer**
* **Anatolii Mezentsev developer**
* **Denis Tsion QA Engineer**
* **Galyna Onyshchenko QA Engineer**
* **Pavel Fesak QA Engineer**

 
## Useful links

**Facebook**
* [Messenger Platform](https://developers.facebook.com/docs/messenger-platform)
* [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
* [Graph API Explorer](https://developers.facebook.com/tools/explorer)
* [Sharing debugger](https://developers.facebook.com/tools/debug/sharing/)

**Dialogflow**
* [Documentation](https://dialogflow.com/docs/reference/v2-agent-setup)

