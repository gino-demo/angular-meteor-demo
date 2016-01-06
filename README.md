# angular-meteor
Angular meteor app demo


First of all : 

 - Install meteor : 
 
    $ curl https://install.meteor.com/ | sh

STEP 1 - Meteor app

 - On your computer create your meteor application :
 
        $ meteor create angular-meteor-demo
    
 - Enter in your application then start it :
 
        $ cd angular-meteor-demo
        $ meteor
    
 - push your application on github : 
    1 - create the angular-meteor-demo app on github
    2 - inside your app, tap : 
    
        $ git init

    3 - you must push everything inside the .meteor folder on github 
    4 - In order to push your code :
    
        $ git remote add origin https://github.com/gino-demo/angular-meteor-demo.git
        $ git push --all --set-upstream origin


STEP 2 - Introducing AngularJS :

In order to use angular with meteor remove this two native packages :

    $ meteor remove blaze-html-templates
    $ meteor remove ecmascript

then add angular :

    $ meteor add angular



STEP 3 - Angular libs :

In order to add angular libs as ui-router & bootstrap :

    $ meteor add angularui:angular-ui-router
    $ meteor add twbs:bootstrap
    
    
Understand the meteor.isClient/Server() function.

   

Step 4 - Meteor Collection

    Events =  new Mongo.Collection("events")






Good things to know :

    - Well organise client and server code in proper own side folders improve readibility of your application and avoid using of Meteor.isClient/Server() method
    - native use of NgAnnotate
    - Security must be implemented regardings the sensitivity level of your data
        - no rules (Only for prototype)
        - Allow/Deny rules 
        - Methods call => Meteor.call()