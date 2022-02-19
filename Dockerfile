###############
# Build Phase #
###############

# Build를 위한 base를 구성합니다.
FROM node:14 as build

# /usr/src/app 폴더를 WORKDIR로 지정
WORKDIR /usr/src/app

# npm install을 위한 파일 복사합니다.
COPY package.json ./
COPY yarn.lock ./

# package 설치
RUN yarn install --production=false

# 소스 복사
COPY . .

# nest build
RUN yarn build

#############
# Run Phase #
#############

# final image를 위한 base를 구성합니다.
FROM node:14-alpine

# /usr/src/app 폴더를 WORKDIR로 설정
WORKDIR /usr/src/app

# build phase에서 소스 복사
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./

# 포트 설정
EXPOSE 4000

# 실행할 명령어
ENTRYPOINT ["yarn", "start:prod"]