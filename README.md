# ExportMyLook
A standalone Proxy module to export/import custom costume information from another person and display them on your end. Included in DressUpMyFriends already, but this is made so you don't have to deal with a big module just for this feature.

Requires Commands module by Pinkie-Pie:https://github.com/pinkipi/command

Use this module in conjunction with custom costume modules(like costume-ex) to export your customized look for other users in a file. Import other users customized file to change their in game costume to their customized ones on your end, in a client sided manner. This way, users can not only use custom costume, but fellow friends can also see how they look like on their screen.

This module will change the appearances of anyone saved in playerdata.json, everytime the character comes into your visible vicinity.

Module is enabled my default.

## Commands (Copied from my other module)
If you want to use the command in chat other than '/proxy' chat, you have to prefix the commands with an exclamation mark (!) .

- fileexport: Create an export file (called 'importdata.json') saving your character costume infomation. You can send this file on to other players with this module to change what YOUR character looks like on their end, if their module is enabled and they have used the 'fileimport' command. (SEE below). Can contain multiple characters, so u can export all your alts, however you must enter this command on each one that you want to save. Overrides the saved character info if importdata.json already contains it with the new infomation. No cids are recorded, only name+itemIDs. No restarts or shutdown of proxy required to copy and send the file.

- fileimport: Imports the file (importdata.json) in your module folder. importdata.json obtained from other player must be put into the module folder where the index.js of this mod is located (ie: bin/node_modules/ExportMyLook, with -master if you are a lazy person lul). If you want to use another person importdata.json but have one of your own importdata.json currently in your module folder, backup your one and delete then copy the one sent by the other party in the module folder. This copies all characters stored in importdata.js, to copy only one or a select few, use 'fileimport (name)'. No restarts or shutdown of proxy required to use this command after importdata.json has been copied into the folder, just copy and use the command.

- fileimport (name): Same as previous command, only that instead of importing all the characters inside importdata.json, you only import the named character. eg: 'fileimport seren' only imports seren character from importdata.json, even if other characters exists.

- eltoggle: toggle disable/enabling of module. Disabling stops automatically changing all saved targets costume.

One word about exports/imports is that if you play across multiple servers, then the appearances of all the same named characters will changed to be the same. So be wise which one you chose to export with.

Also, what the fileimport command does is to import the data from importdata.json into playerdata.json (the file created/saved in when you use dressupsave). After importing is done using fileimport command, you can replace importdata.json with another player's so that multiple imports can be done from different players to create a common savefile (playerdata.json) where all the players characters will look like how it is on their end.
