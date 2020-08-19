# Document is under construction.

# last version of the document availabe [here](https://app.swaggerhub.com/apis-docs/fard2000/barnamesaziSystem/1.0.0)
    
## Description

This is a REST API for an app. this api develop with nodejs and use mysql as database manager. There are a couple of entity such as user, game, question and more, what you can manage them by this api. The api has some future like payment gateway and a panel for admin for managing entities stored in database.
You can find out how to use the api by reading the api document written below:

## API Document
Note: the API root domain is: "https://barnamesazisystemprojectapi-fandoghnamespace.fandogh.cloud/"


- #### [User](https://github.com/faridEsnaashari/nest-test#api-documentgraphql)
    - [get one user](https://github.com/faridEsnaashari/nest-test#title-get-one-user)
    - [get all user](https://github.com/faridEsnaashari/nest-test#title-get-all-user)
    - [createUser](https://github.com/faridEsnaashari/nest-test#title-create-user)
    - [updateUser](https://github.com/faridEsnaashari/nest-test#title-update-user)
    - [deleteUser](https://github.com/faridEsnaashari/nest-test#title-delete-user)
- ### [websocket](https://github.com/faridEsnaashari/nest-test#api-documentwebsocket)
    - [get one user](https://github.com/faridEsnaashari/nest-test#title-get-one-user-1)
    - [get all user](https://github.com/faridEsnaashari/nest-test#title-get-all-user-1)
    - [createUser](https://github.com/faridEsnaashari/nest-test#titlecreateuser)
    - [updateUser](https://github.com/faridEsnaashari/nest-test#titleupdateuser)
    - [deleteUser](https://github.com/faridEsnaashari/nest-test#titledeleteuser)
## User
With this route you can manage user staff. The allowed operations and methods what you can do for this entity are: 


**READ:** method => GET,

**CREATE:** method => POST,

**UPDATE:** method => PUT,

**DELETE:** method => DELETE,


You can read thier document as follow:

#### user(GET) "*rootEndPoint*/user":
**Description:** This end point get a user token and return details of a user that user token belongs to it as response. 

**Requst parameters:** 
- **In query:**
    - usertoken: 
    - required: YES
    - type: string
    - Description: token of the user that you want its detail.
    - example: "eyJhbGciOiJIUzI1NiJ9.MQ.BLRdKZczwluV4R_WDKiS-FWuFoajxn8CIPgCkZS_4Fs"

**Response body:** 
- Status code: 200
    - description: if there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            "user": {
            "username": <string>,
            "phonenumber": <string>,
            "name": <string>,
            "teamColor": <string>,
            "health": <string>,
            "ticket": <string>,
            "coin": <string>,
            "score": <string>
            },
        
            "countOfplayingGame": {
            "total": <integer>,
            "activeGame": <integer>
            },
        
            "teamsMembersNumber": {
            "red": <integer>,
            "blue": <integer>
            }
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "user": {
            "username": "fard2000",
            "phonenumber": "09140586598",
            "name": "farid",
            "teamColor": "blue",
            "health": "23",
            "ticket": "3",
            "coin": "500",
            "score": "2300"
            },
        
            "countOfplayingGame": {
            "total": 10,
            "activeGame": 8
            },
        
            "teamsMembersNumber": {
            "red": 20,
            "blue": 27
            }
        }
        ```

***

- Status code: 400
    - description: if wrong prameters provide to the api, the api return this object as response. (e.g. send usetoken instead of usertoken):
    - body:

        ```javascript
        {
          "message": "bad parameter provided"
        }
        ```

***

- Status code: 401
    - description: if wrong user token provided to api, the api return this object as response:
    - body:

        ```javascript
        {
          "message": "user unauthorized"
        }
        ```

***

- Status code: 404
    - description: if the user that you are looking for, does not exist, the api return this object as response:
    - body:

        ```javascript
        {
          "message": "user not found"
        }
        ```

***

#### user(POST) "*rootEndPoint*/user":
**Description:** This end point get details of a user and create it on the api. you should provide these details as a json object:

**Requst parameters:** 
- **In body:**
    - username: 
    - required: YES
    - type: string
    - Description: The user name of the user you want to create it.
    - example: "farid1378"

- **In body:**
    - phonenumber: 
    - required: YES
    - type: string
    - Description: The phone number of the user you want to create it.
    - example: "09140586598"

- **In body:**
    - name: 
    - required: YES
    - type: string
    - Description: The name of the user you want to create it.
    - example: "farid"

- **In body:**
    - teamColor: 
    - required: YES
    - type: string
    - Description: The team color of the user you want to create it.
    - example: "blue"

- **the request body structure should be like this:**

    ```javascript
    {
      "username": "farid1378",
      "phonenumber": "09140586598",
      "name": "farid",
      "teamColor": "blue"

    }
    ```

**Response body:** 
- Status code: 201
    - description: if user created without any problem, this object return as response.
    - body:

        ```javascript
        {
          "message": "user created"
        }
        ```

***

- Status code: 400
    - description: if wrong prameters provide to the api, the api return this object as response.
    - body:

        ```javascript
        {
          "message": "bad parameter provided"
        }
        ```

***

- Status code: 409
    - description: if the user name or phone number of the user that you try to create it already existed in database, this object return as response.
    - body:

        ```javascript
        {
          "message": "user unauthorized"
        }
        ```

***

#### user(PUT) "*rootEndPoint*/user":
**Description:** This end point get details of a existed user and update it. you can provide just some of the detail and don't need to provide complete details. But you should provide usertoken:

**Requst parameters:** 
- **In body:**
    - usertoken: 
    - required: YES
    - type: string
    - Description: The token of the user you want to update it.
    - example: "eyJhbGciOiJIUzI1NiJ9.MQ.BLRdKZczwluV4R_WDKiS-FWuFoajxn8CIPgCkZS_4Fs"

- **In body:**
    - name: 
    - required: NO
    - type: string
    - Description: The name of the user you want to create it.
    - example: "farid"

- **In body:**
    - teamColor: 
    - required: NO
    - type: string
    - Description: The team color of the user you want to create it.
    - example: "blue"

- **In body:**
    - health: 
    - required: NO
    - type: string
    - Description: You can only decrease health and for that you should provide its value as "decrease". Other wise you get error.
    - example: "decrease"

- **In body:**
    - ticket: 
    - required: NO
    - type: string
    - Description: You can only decrease ticket and for that you should provide its value as "decrease". Other wise you get error.
    - example: "decrease"

- **In body:**
    - coin: 
    - required: NO
    - type: string
    - Description: The coin qty of user.
    - example: "500"

- **the request body structure should be like this(maybe less or more):**

    ```javascript
    {
      "usertoken": "eyJhbGciOiJIUzI1NiJ9.MTA.dkGYXO_yXY77OSnjCUKM5JBhZLDThulXn5U42a34U9g",
      "name": "farid",
      "teamColor": "blue",
      "ticket": "decrease",
      "coin": 500
    }
    ```

**Response body:** 
- Status code: 200
    - description: if user updated without any problem, this object return as response.
    - body:

        ```javascript
        {
          "message": "user updated"
        }
        ```

***

- Status code: 400
    - description: if wrong prameters provide to the api, the api return this object as response.
    - body:

        ```javascript
        {
          "message": "bad parameter provided"
        }
        ```

***

- Status code: 401
    - description: if wrong user token provided to api, the api return this object as response:
    - body:

        ```javascript
        {
          "message": "user unauthorized"
        }
        ```

***

- Status code: 404
    - description: if the user that you are looking for, does not exist, the api return this object as response:
    - body:

        ```javascript
        {
          "message": "user not found"
        }
        ```

***

#### user(DELETE) "*rootEndPoint*/user":
**Description:** This method is use to delete a user from database specified by user token:

**Requst parameters:** 
- **In body:**
    - usertoken: 
    - required: YES
    - type: string
    - Description: The token of the user you want to delete it.
    - example: "eyJhbGciOiJIUzI1NiJ9.MQ.BLRdKZczwluV4R_WDKiS-FWuFoajxn8CIPgCkZS_4Fs"

    ```javascript
    {
      "usertoken": "eyJhbGciOiJIUzI1NiJ9.MTA.dkGYXO_yXY77OSnjCUKM5JBhZLDThulXn5U42a34U9g",
    }
    ```

**Response body:** 
- Status code: 200
    - description: if user deleted without any problem, this object return as response.
    - body:

        ```javascript
        {
          "message": "user deleted"
        }
        ```

***

- Status code: 400
    - description: if wrong prameters provide to the api, the api return this object as response.
    - body:

        ```javascript
        {
          "message": "bad parameter provided"
        }
        ```

***

- Status code: 401
    - description: if wrong user token provided to api, the api return this object as response:
    - body:

        ```javascript
        {
          "message": "user unauthorized"
        }
        ```

***

- Status code: 404
    - description: if the user that you are looking for, does not exist, the api return this object as response:
    - body:

        ```javascript
        {
          "message": "user not found"
        }
        ```

## Games
With this route you can manage games staff. The allowed operations and methods what you can do for this entity are: 


**READ:** method => GET,

**CREATE:** method => POST,

**UPDATE:** method => PUT,


You can read thier document as follow:

#### game(GET) "*rootEndPoint*/gamestatus":
**Description:** This end point get all defineded games or just get current active game as response. 

**Requst parameters:** 
- **In query:**
    - activegame: 
    - required: NO
    - type: string
    - Description: If you provide this parameter with true value, you get just current active game as response. Otherwise you get all defineded games as response(it is OPTIONAL).
    - example: "true"

**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            "games": [
                {
                    "label": <string>,
                    "duration": <integer>,
                    "startedTime": <string>,
                    "active": <integer> 
                }
            ]
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "games": [
                {
                    "label": "gamenumber1",
                    "duration": 8,
                    "startedTime": "2019-07-16T08:50:53.167Z",
                    "active": 0
                },
                {
                    "label": "gamenumber2",
                    "duration": 72,
                    "startedTime": "2019-07-16T08:50:53.167Z",
                    "active": 1
                },
                {
                    "label": "gamenumber3",
                    "duration": 24,
                    "startedTime": null,
                    "active": 0
                }
            ]
        }
        ```

***

#### game(POST) "*rootEndPoint*/gamestatus":
**Description:** This end point get details of a game and create it on the api. you should provide these details as a json object:

**Requst parameters:** 
- **In body:**
    - label: 
    - required: YES
    - type: string
    - Description: The label of the game you want to create it.
    - example: "gamenumber1"

- **In body:**
    - duration: 
    - required: YES
    - type: string
    - Description: The time duration of the game you want to create it.
    - example: 8

- **the request body structure should be like this:**

    ```javascript
    {
        "label": "gamenumber1",
        "duration": 8,
    }
    ```

**Response body:** 
- Status code: 201
    - description: if game created without any problem, this object return as response.
    - body:

        ```javascript
        {
          "message": "game created"
        }
        ```

***

- Status code: 400
    - description: if wrong prameters provide to the api, the api return this object as response.
    - body:

        ```javascript
        {
          "message": "bad parameter provided"
        }
        ```

***

#### game(PUT) "*rootEndPoint*/gamestatus":
**Description:** This end point get duration of a existed game and update it. You should provide the label of the game you want to update it. Also you can update more than one game via a request.

**Requst parameters:** 
- **In body:**
    - label: 
    - required: YES
    - type: string
    - Description: The label of the game you want to update it.
    - example: "gamenumber1"

- **In body:**
    - duration: 
    - required: YES
    - type: string
    - Description: The new time duration of the game.
    - example: 8

- **the request body structure should be like this(maybe less or more):**

    ```javascript
    {
        "label": "gamenumber1",
        "duration": 8,
    }
    ```

**Response body:** 
- Status code: 200
    - description: If game updated without any problem, this object return as response.
    - body:

        ```javascript
        {
          "message": "game updated"
        }
        ```

***

- Status code: 400
    - description: If wrong prameters provide to the api, the api return this object as response.
    - body:

        ```javascript
        {
          "message": "bad parameter provided"
        }
        ```

***

- Status code: 404
    - description: If all or some of the game not found, the api return the id of the game that not found and like this.
    - body:

        ```javascript
        {
            "message": "these/this game(s) not found",
            "games": [
                21,
                3,
                10
            ]
        }
        ```

***



#### <b>title:</b> get one user<br>
<b>description:</b> get details of an user specified by id(user\_id)<br>
<b>method:</b> \<POST\><br>
<b>request domain:</b> "localhost:3000/graphql"<br>
<b>request body:</b> 

    query{
        user(user_id: <$id: number>){
            name
            age
            gender
            phonenumber
        }
    }

***




## Contact me

- linkdin - [farid esnaashar](https://www.linkedin.com/in/farid-esnaashar-8bb139199)
- telegram - [@farid_esnaashar](https://t.me/farid_esnaashar)


