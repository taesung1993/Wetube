# 🖐 소개(Introduction)

Wetube는 node.js 프레임 워크와 바닐라 자바스크립트를 이용해서 만든 유튜브 클론 앱 입니다. 이 어플리케이션은 [노마드 코더](https://nomadcoders.co/) 사이트의 유튜브 클론 앱 만들기 강의를 참고해서 만들었습니다(Wetube is youtube clone app and I made this app using node.js and vanila javascript. Also, I did refer to the lectures called "making youtube clone app" on [Nomad coder](https://nomadcoders.co/)).
<br/>
<br/>

# 🚘 링크(To Link)

- Link -> [WETUBE](https://secret-savannah-99819.herokuapp.com/)
- 공유 아이디(shared Id): wetubeAdmin@gmail.com
- 공유 비밀번호(shared Password): 123
<br/>
<br/>

# 🔨 사용한 NPM 툴(used npm tool)
```
 "dependencies": {
    "cross-env": "^7.0.2",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "@babel/cli": "^7.10.5",
    "@babel/core": "^7.11.1",
    "@babel/preset-env": "^7.10.4",
    "@babel/node": "^7.10.5",
    "@babel/polyfill": "^7.10.4",
    "@ffmpeg-installer/ffmpeg": "^1.0.20",
    "autoprefixer": "^9.8.5",
    "aws-sdk": "^2.729.0",
    "axios": "^0.19.2",
    "babel-loader": "^8.1.0",
    "body-parser": "^1.19.0",
    "child_process": "^1.0.2",
    "connect-mongo": "^3.2.0",
    "cookie-parser": "^1.4.5",
    "css-loader": "^3.6.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "fluent-ffmpeg": "^2.1.2",
    "get-video-duration": "^3.0.1",
    "helmet": "^3.23.3",
    "mongoose": "^5.9.25",
    "morgan": "^1.10.0",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "node-sass": "^4.14.1",
    "passport": "^0.4.1",
    "passport-github": "^1.1.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^6.0.1",
    "postcss-loader": "^3.0.0",
    "pug": "^3.0.0",
    "sass-loader": "^9.0.2",
    "streamifier": "^0.1.1",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  }
```
<br/>
<br/>

# 📢 특징(Characteristic)

- 이 어플리케이션은 서버가 단순히 클라이언트의 요청에 대한 응답만 보내도록 하는 stateless 형태로 구현하였습니다. DB는 No SQL 언어인 MongoDB를 이용하였고, 클라우드는 aws S3, Mongo Atlas를 이용하였습니다(I make this app as the type called stateless server. The stateless server is structure that the server act only to send response to client. I selected mongoDB as the database and aws S3, Mongo Atlas as cloud)


- 이 어플리케이션의 기능은 다음과 같습니다(This app has the functions as following:).
  * 회원가입, 깃허브 아이디로 회원가입, 구글 아이디로 회원가입(Join yourself, join with github and google id)
  * 로그인, 깃허브 아이디로 로그인, 구글 아이디로 로그인(Login yourself, login with github and google id)
  * 비디오 업로드(upload video)
  * 프로필 업데이트(Profile update)
  * 비디오 업데이트(Video update)
  * 비디오 댓글(Video Comment)
  * 유저 팔로우/언팔로우(User Follow/Unfollow)
