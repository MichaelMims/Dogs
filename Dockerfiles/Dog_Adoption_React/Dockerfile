FROM debian

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install -y nodejs subversion

## start
RUN svn checkout https://github.com/MichaelMims/
RUN mkdir app
RUN cp -r front-end /app

RUN cd /app/front-end && npm install

EXPOSE 5000
WORKDIR /app/front-end/

ENV REACT_APP_API_BASE_URL localhost
CMD npm run build && npm run production