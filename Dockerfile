#use ubuntu as OS
FROM ubuntu

#apdate repository
RUN apt update

#install nodejs with curl
RUN yes | apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

#copy api files to container
RUN mkdir barnamesaziSystem
COPY app.js package.json package-lock.json server.js /barnamesaziSystem/
COPY api/ /barnamesaziSystem/api/
COPY node_modules/ /barnamesaziSystem/node_modules/
COPY views/ /barnamesaziSystem/views/

WORKDIR "/barnamesaziSystem"

EXPOSE 3000

RUN npm i

#and at the end, run api as nodejs webApp
CMD [ "node", "/barnamesaziSystem/server.js" ] 
