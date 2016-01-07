# angular-meteor-demo
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



 - Modulus part :
 
    create an account on modulus then create a project then create a database then add Environement variable in administration panel :
     - MONGO_URL : mongodb://ginosiccio:ginosiccio@apollo.modulusmongo.net:27017/y6poTijo
     - ROOT_URL : http://angularmeteordemo-57548.onmodulus.net
     
     Install modulus on your computer then login and deploy it :
     
        $ npm install -g modulus
        $ modulus login
        $ modulus deploy -p "angular-meteor-demo"
        $ modulus token create

     Save the token generated

 - Codeship part :
 
    create an account and login with your github account
    create a new project from the angular-meteor-demo github repository
    create your own node.js custom command and add this below
     
    nvm install 0.10.40
    nvm use 0.10.40
    npm install jshint -g
    curl -o meteor_install_script.sh https://install.meteor.com/
    chmod +x meteor_install_script.sh
    sed -i "s/type sudo >\/dev\/null 2>&1/\ false /g" meteor_install_script.sh
    ./meteor_install_script.sh
    export PATH=$PATH:~/.meteor/
    meteor --version

     then save and go dashboard
     
     On your computer, generate your modulus api id :
     

    On co
     Configure your deployment pipeline indicating which branch to follow :
     ex : Step_1_Meteor_Init