# Document is under construction.

# last version of the document availabe [here](https://app.swaggerhub.com/apis-docs/fard2000/barnamesaziSystem/1.0.0)
    
## Description

This is a REST API for an app. this api develop with nodejs and use mysql as database manager. There are a couple of entity such as user, game, question and more, what you can manage them by this api. The api has some future like payment gateway and a panel for admin for managing entities stored in database.
You can find out how to use the api by reading the api document written below:

## API Document
Note: the API root domain is: "https://barnamesazisystemprojectapi-fandoghnamespace.fandogh.cloud/"


- #### [User](https://github.com/faridEsnaashari/barnamesaziSystemProject#user-1)
- #### [Game](https://github.com/faridEsnaashari/barnamesaziSystemProject#games)
- #### [Question](https://github.com/faridEsnaashari/barnamesaziSystemProject#question-1)
- #### [Store](https://github.com/faridEsnaashari/barnamesaziSystemProject#store-3)
- #### [Signin](https://github.com/faridEsnaashari/barnamesaziSystemProject#signin)
- #### [Top score](https://github.com/faridEsnaashari/barnamesaziSystemProject#top-score)
- #### [Teams Members Number](https://github.com/faridEsnaashari/barnamesaziSystemProject#teams-members-number)
- #### [Pay](https://github.com/faridEsnaashari/barnamesaziSystemProject#pay)
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

## Question
With this route you can manage questions staff. The allowed operations and methods what you can do for this entity are: 


**READ:** method => GET,

**CREATE:** method => POST,

**UPDATE:** method => PUT,

**DELEE:** method => DELETE,


You can read thier document as follow:

#### question(GET) "*rootEndPoint*/question":
**Description:** This end point use lownumber and highnumber parameter to get some qustions between these two number. If these two number don't provide, you get a random question. 

**Requst parameters:** 
- **In query:**
    - lownumber: 
    - required: NO
    - type: integer
    - Description: You should use this with highnumber together. If you don't, you should provid usertoken.
    - example: 0

- **In query:**
    - highnumber: 
    - required: NO
    - type: integer
    - Description: You should use this with lownumber together. If you don't, you should provid usertoken.
    - example: 10

- **In query:**
    - usertoken: 
    - required: NO
    - type: string
    - Description: If use this parameter, you get a question randomly(it is a unique question for each user). If you don't, you should provid highnumber and lownumber together.
    - example: "eyJhbGciOiJIUzI1NiJ9.MQ.BLRdKZczwluV4R_WDKiS-FWuFoajxn8CIPgCkZS_4Fs"

**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
        "questions": [
            {
                "id": <Integer>,
                "question": <String>,
                "answer1": <String>,
                "answer2": <String>,
                "answer3": <String>,
                "answer4": <String>,
                "currect": <Integer>
            }
        ]
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
        "questions": [
            {
                "id": 2,
                "question": "question text1",
                "answer1": "answer1",
                "answer2": "answer2",
                "answer3": "answer3",
                "answer4": "answer4",
                "currect": 1
            },
            {
                "id": 3,
                "question": "question text2",
                "answer1": "answer1",
                "answer2": "answer2",
                "answer3": "answer3",
                "answer4": "answer4",
                "currect": 4
            }
        ]
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

- Status code: 401
    - description: If usertoken you provid is not authorized, the api return the id of the game that not found and like this.
    - body:

        ```javascript
        {
            "message": "user unauthorized"
        }
        ```

***

- Status code: 404
    - description: If there is no more question to return, the api return the id of the game that not found and like this.
    - body:

        ```javascript
        {
            "message": "there is no more question"
        }
        ```

***

#### question(POST) "*rootEndPoint*/question":
**Description:** This end point get details of one or more questions and create it/theme on the api. you should provide these details as a json object:

**Requst parameters:** 
- **In body:**
    - question: 
    - required: YES
    - type: string
    - Description: The question text of the question you want to create it.
    - example: "question text1"

- **In body:**
    - answer1: 
    - required: YES
    - type: string
    - Description: The first answer text of the question you want to create it.
    - example: "answer1"

- **In body:**
    - answer2: 
    - required: YES
    - type: string
    - Description: The second answer text of the question you want to create it.
    - example: "answer2"

- **In body:**
    - answer3: 
    - required: YES
    - type: string
    - Description: The third answer text of the question you want to create it.
    - example:"answer3"

- **In body:**
    - answer4: 
    - required: YES
    - type: string
    - Description: The forth answer text of the question you want to create it.
    - example: "answer4"

- **In body:**
    - currect: 
    - required: YES
    - type: string
    - Description: The number of currect answer of the question.
    - example: 2

- **the request body structure should be like this:**

    ```javascript
    {
        "questions": [
            {
                "question": "question text1",
                "answer1": "answer1",
                "answer2": "answer2",
                "answer3": "answer3",
                "answer4": "answer4",
                "currect": 1
            },
            {
                "question": "question text2",
                "answer1": "answer1",
                "answer2": "answer2",
                "answer3": "answer3",
                "answer4": "answer4",
                "currect": 4
            }
        ]
    }
    ```

**Response body:** 
- Status code: 201
    - description: If questions created without any problem, this object return as response.
    - body:

        ```javascript
        {
            "message": "question(s) created"
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

#### question(PUT) "*rootEndPoint*/question":
**Description:** This end point get quesion parameter alongside id of the existed question and update it. You should provide the id of the you want to update it. Also you can update more than one question via a request.

**Requst parameters:** 
- **In body:**
    - id: 
    - required: YES
    - type: integer
    - Description: The id of the question you want to update it.
    - example: 2

- **In body:**
    - question: 
    - required: YES
    - type: string
    - Description: The question text of the question you want to create it.
    - example: "question text1"

- **In body:**
    - answer1: 
    - required: YES
    - type: string
    - Description: The first answer text of the question you want to create it.
    - example: "answer1"

- **In body:**
    - answer2: 
    - required: YES
    - type: string
    - Description: The second answer text of the question you want to create it.
    - example: "answer2"

- **In body:**
    - answer3: 
    - required: YES
    - type: string
    - Description: The third answer text of the question you want to create it.
    - example:"answer3"

- **In body:**
    - answer4: 
    - required: YES
    - type: string
    - Description: The forth answer text of the question you want to create it.
    - example: "answer4"

- **In body:**
    - currect: 
    - required: YES
    - type: string
    - Description: The number of currect answer of the question.
    - example: 2

- **the request body structure should be like this(maybe less or more):**

    ```javascript
    {
        "questions": [
            {
                "id": 3,
                "question": "question text1",
                "answer1": "answer1",
                "answer2": "answer2",
                "answer3": "answer3",
                "answer4": "answer4",
                "currect": 1
            },
            {
                "id": 5,
                "answer1": "answer1",
                "answer2": "answer2",
                "answer3": "answer3",
                "answer4": "answer4",
                "currect": 4
            }
        ]
    }
    ```

**Response body:** 
- Status code: 200
    - description: If game updated without any problem, this object return as response.
    - body:

        ```javascript
        {
          "message": "question(s) updated"
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
            "message": "these/this question(s) not found",
            "games": [
                21,
                3,
                10
            ]
        }
        ```

***

#### question(DELETE) "*rootEndPoint*/question":
**Description:** This method is use to delete one or more question from database specified by theire ids:

**Requst parameters:** 
- **In body:**
    - id: 
    - required: YES
    - type: array of integer
    - Description: The ids of the question you want to delete them.
    - example: [1, 2, 3]

    ```javascript
    {
        "ids": [
            1,
            2,
            5,
            10
        ]
    }
    ```

**Response body:** 
- Status code: 200
    - description: if questions deleted without any problem, this object return as response.
    - body:

        ```javascript
        {
          "message": "question(s) deleted"
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

- Status code: 404
    - description: if the questions that you are looking for, do not exist, the api return this object as response:
    - body:

        ```javascript
        {
            "message": "these/this question(s) not found",
            "questions": [
                21,
                3,
                10
            ]
        }
        ```

## Store
With this route you can manage items staff. The allowed operations and methods what you can do for this entity are: 


**READ:** method => GET,

**CREATE:** method => POST,

**UPDATE:** method => PUT,


You can read thier document as follow:

#### store(GET) "*rootEndPoint*/store":
**Description:** This end point use to get items existed in database.  

**Requst parameters:** 
- NONE  
**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            "coin": [
                {
                    "count": <integer>,
                    "price": <integer>
                }
            ],
            "health": [
                {
                    "count": <integer>,
                    "price": <integer>
                }
            ],
            "ticket": [
                {
                    "count": <integer>,
                    "price": <integer>
                }
            ]
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "coin": [
                {
                    "count": 2,
                    "price": 2000
                },
                {
                    "count": 3,
                    "price": 3000
                }
            ],
            "health": [
                {
                    "count": 2,
                    "price": 2000
                },
                {
                    "count": 3,
                    "price": 3000
                }
            ],
            "ticket": [
                {
                    "count": 2,
                    "price": 2000
                },
                {
                    "count": 3,
                    "price": 3000
                }
            ]
        }
        ```

***

#### store(POST) "*rootEndPoint*/store":
**Description:** This end point get details of one or more item and create it/theme on the api. you should provide these details as a json object:

**Requst parameters:** 
- **In body:**
    - name: 
    - required: YES
    - type: string
    - Description: The name of the itme you want to create it.
    - example: "coin"

- **In body:**
    - price: 
    - required: YES
    - type: integer
    - Description: The price of the itme you want to create it.
    - example: 2000

- **In body:**
    - count: 
    - required: YES
    - type: integer
    - Description: The count of the itme you want to create it.
    - example: 2

- **the request body structure should be like this:**

    ```javascript
    {
        "items": [
            {
                "name": "coin",
                "price": 2000,
                "count": 2
            },
            {
                "name": "coin",
                "price": 4000,
                "count": 5
            },
            {
                "name": "heath",
                "price": 6000,
                "count": 5
            }
        ]
    }
    ```

**Response body:** 
- Status code: 201
    - description: If items created without any problem, this object return as response.
    - body:

        ```javascript
        {
            "message": "item(s) created"
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
    - description: If some items already existed in database, this object return as response.
    - body:

        ```javascript
        {
            "message": "item existed"
        }
        ```

***

#### store(PUT) "*rootEndPoint*/store":
**Description:** This end point get items parameter alongside id of the existed item and update it. You should provide the id of the item you want to update it. Also you can update more than one item via a request.

**Requst parameters:** 
- **In body:**
    - id: 
    - required: YES
    - type: integer
    - Description: The id of the itme you want to create it.
    - example: 1

- **In body:**
    - price: 
    - required: YES
    - type: integer
    - Description: The price of the itme you want to create it.
    - example: 2000

- **In body:**
    - count: 
    - required: YES
    - type: integer
    - Description: The count of the itme you want to create it.
    - example: 2

- **the request body structure should be like this(maybe less or more):**

    ```javascript
    {
        "items": [
            {
                "id": 2,
                "price": 2000,
                "count": 2
            },
            {
                "id": 5,
                "price": 6000,
                "count": 5
            }
        ]
    }
    ```

**Response body:** 
- Status code: 200
    - description: If game updated without any problem, this object return as response.
    - body:

        ```javascript
        {
          "message": "item(s) updated"
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
    - description: If all or some of the items not found, the api return the id of the game that not found and like this.
    - body:

        ```javascript
        {
            "message": "these/this item(s) not found",
            "games": [
                21,
                3,
                10
            ]
        }
        ```

***

## Signin
You can use this route to signin a user. The allowed operations and methods what you can do for this entity are: 


**READ:** method => GET,

You can read thier document as follow:

#### signin(GET) "*rootEndPoint*/signin":
**Description:** This end point use to signin a user.  

**Requst parameters:** 
- **In query:**
    - phoneumber: 
    - required: YES
    - type: string
    - Description: The phonenumber of the user you want to sigin it in.
    - example: 09140466902
  
**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            token: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "token": "eyJhbGciOiJIUzI1NiJ9.MTA.dkGYXO_yXY77OSnjCUKM5JBhZLDThulXn5U42a34U9g"
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
    - description: If The user you are looking for does not found, the api return the id of the game that not found and like this.
    - body:

        ```javascript
        {
            "message": "user not found"
        }
        ```

***

## Top score
You can use this route to get top scores users. The allowed operations and methods what you can do for this entity are: 


**READ:** method => GET,

You can read thier document as follow:

#### topscores(GET) "*rootEndPoint*/topscores":
**Description:** This end point use to get top scores users. You get users ordered by high score.  

**Requst parameters:** 
- **In query:**
    - limit: 
    - required: YES
    - type: string
    - Description: The number of users you want to get.
    - example: 10
  
- **In query:**
    - activegame: 
    - required: NO
    - type: string
    - Description: if provide this as true, you get top scores in current active game. Else you get general top scores.
    - example: true
 
**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            "users": [
                {
                "user": {
                    "username": <String>,
                    "phonenumber": <String>,
                    "name": <String>,
                    "teamColor": <String>,
                    "health": <Integer>,
                    "ticket": <Integer>,
                    "score": <Integer>
                },
                "countOfplayingGame": {
                    "total": <Integer>,
                    "activeGame": <Integer>
                }
                }
            ]
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "users": [
                {
                "user": {
                    "username": "farid",
                    "phonenumber": "09135466901",
                    "name": "farid",
                    "teamColor": "blue",
                    "health": 2,
                    "ticket": 4,
                    "score": 1000
                },
                "countOfplayingGame": {
                    "total": 3000,
                    "activeGame": 1000
                }
                },
                {
                "user": {
                    "username": "reza",
                    "phonenumber": 09140420901,
                    "name": "reza",
                    "teamColor": "blue",
                    "health": 2,
                    "ticket": 4,
                    "score": 500
                },
                "countOfplayingGame": {
                    "total": 2500,
                    "activeGame": 500
                }
                },
            ]
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

## Teams Members Number
You can use this route to get total number of users in each team. The allowed operations and methods what you can do for this entity are: 


**READ:** method => GET,

You can read thier document as follow:

#### signin(GET) "*rootEndPoint*/signin":
**Description:** This end point use to get total number of users in each team. 

**Requst parameters:** 
- NONE
**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            "blue": <integer>,
            "red": <integer>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "blue": 20,
            "red": 27
        }
        ```

***

## Add Score
You can use this route to add score for the specific user. The allowed operations and methods what you can do for this entity are: 


**READ:** method => GET,

You can read thier document as follow:

#### addscore(GET) "*rootEndPoint*/addscore":
**Description:** This end point use to add score for the specific user.  

**Requst parameters:** 
- **In query:**
    - usertoken: 
    - required: YES
    - type: string
    - Description: The token of the user you want to add score for it.
    - example: "eyJhbGciOiJIUzI1NiJ9.MQ.BLRdKZczwluV4R_WDKiS-FWuFoajxn8CIPgCkZS_4Fs"
  
- **In query:**
    - score: 
    - required: YES
    - type: string
    - Description: the amount of score you want to add.
    - example: 10
 
**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            "message": <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "message": "user score updated"
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

- Status code: 401
    - description: If user you are looking for is not authorized, the api return this object as response.
    - body:

        ```javascript
        {
          "message": "user unauthorized"
        }
        ```

***

## Pay
You can use this route to get user, functionality to pay for specific item. The allowed operations and methods what you can do for this entity are: 


**READ:** method => GET,

You can read thier document as follow:

#### pay(GET) "*rootEndPoint*/pay":
**Description:** This end point use to get back a payment url that you can use it to do transaction operation.  

**Requst parameters:** 
- **In query:**
    - usertoken: 
    - required: YES
    - type: string
    - Description: The token of the user you want to do payment for it.
    - example: "eyJhbGciOiJIUzI1NiJ9.MQ.BLRdKZczwluV4R_WDKiS-FWuFoajxn8CIPgCkZS_4Fs"
  
- **In query:**
    - itemid: 
    - required: YES
    - type: string
    - Description: The id of the item user want to pay for it.
    - example: 10
 
**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            "message": <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "message": **ADD A URL**
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

- Status code: 401
    - description: If user you are looking for is not authorized, the api return this object as response.
    - body:

        ```javascript
        {
          "message": "user unauthorized"
        }
        ```

***

- Status code: 503
    - description: If some thing wrong happend about zarinpal, the api return this object as response.
    - body:

        ```javascript
        {
          "message": "zarinpall returns an error"
        }
        ```

***

### **AFTER TRANSACTION**

- Status code: 406
    - description: If transaction failed, the api return this object as response.
    - body:

        ```javascript
        {
          "message": 'payment process failed'
        }
        ```

***

- Status code: 200
    - description: If transaction done successfuly, the api return this object as response.
    - body:

        ```javascript
        {
            RefID : **ADD A REFID**,
            message : 'payment accepted'
        }
        ```

***


## Contact me

- linkdin - [farid esnaashar](https://www.linkedin.com/in/farid-esnaashar-8bb139199)
- telegram - [@farid_esnaashar](https://t.me/farid_esnaashar)

https://gitlab.com/tets3/test.git
