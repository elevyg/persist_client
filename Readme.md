# Setup

Steps to start the application:

1. In the root do a `yarn`
2. `cd` into `/apps/app` and do a `yarn ios` to build the app for iOS and start it
3. open a new tab and `cd` into `/apps/frontend` and do a `yarn dev` to start the frontend

Now you should see the app running inside the simulator.

When clicking the button "Press me", you will see a console log with a random number in both terminals.

# Reproduce

### Working, when app is not closed

Do the following:

1. stop the frontend with `ctrl + c`
2. inside the app, press the button "Press me" a couple of times
3. start the frontend again with `yarn dev`
4. you will see that the app has persisted the mutations and will call them one after the other

### Not working, when app is closed

Do the following:

1. stop the frontend with `ctrl + c`
2. inside the app, press the button "Press me" a couple of times
3. now, also stop the app with `ctrl + c`
4. close the app completely, so that it does not run in the background (!)
5. start the frontend again with `yarn dev`
6. start the app again with `yarn ios`
7. you will see that the has _not_ persisted the mutations
