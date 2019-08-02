# Neato telegram bot
A telegram bot to control your neato (XV) or vorwerk vr 100 with an esp8266 module

## Bot usage
Just type in your chat `/help` and you'll get a list with all available commands.

The following possibilities you got:
* Start cleaning
* Stop cleaning
* Show current errors
* Delete errors
* Show Neato log
* Show current battery percentage you check
if connected to docking station

## Installation
* Checkout this repo und go into it via terminal
* `npm install`

## Configuration
Should be self explaining have a look at the comments
* copy the *config.json.example* to *config.json* and remove the comments

## How to setup your neato or vorwerk vacuum bot
### Hardware
You have to install an esp8266 within your neato.
Solder RX, TX, 3V and GND to the Serial Pins.

A picture which explains the port you'll find in this post -> http://www.robotreviews.com/chat/viewtopic.php?t=15349&f=4

> Hint: VCC = 3.3V, RTS is not used and CTS is not used

### Software
Flash the image from https://www.neatoscheduler.com/ onto your ESP. -> You must create an account to get the image.

Or build and flash your own image from
https://github.com/HawtDogFlvrWtr/botvac-wifi

> Hint: If you want to build your image, you could comment out the things which connects to the neatoscheduler website, this is not needed.

### Usage
If everything is setup your esp/neato will connect to your wifi and opens a websocket on port 81, which this project will communicate with.