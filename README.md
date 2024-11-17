# Boilerplate 3.3.0
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Module Layers
### Module
- 애플리케이션의 구성 요소를 조직화하고 구성하는 기본 단위입니다. NestJS는 모듈화 아키텍처를 따르며, 애플리케이션을 여러 모듈로 나누어 개발을 진행합니다. 각 모듈은 특정 기능이나 도메인을 중심으로 그룹화되며, 다른 모듈들과 결합하여 하나의 애플리케이션을 구성합니다.
### Controller
- 애플리케이션의 입력을 처리하는 주요 역할을 담당하는 레이어입니다. 주로 HTTP 요청을 처리하고, 요청에 맞는 서비스 로직을 호출한 뒤 응답을 반환하는 작업을 합니다. Controller는 클라이언트와 애플리케이션 간의 인터페이스 역할을 하며, REST API나 GraphQL API와 같은 다양한 프로토콜을 사용할 수 있습니다.
### Service
- Controller와 직결되어 비즈니스 로직을 처리하는 클래스입니다. **외부 클래스에서 의존성을 주입받아 사용할 수 없도록** 설계되어 있습니다.
- 비즈니스 로직을 담당하며, 외부 클래스에서 직접 접근할 수 없도록 제한된 범위에서 사용됩니다. 모든 비즈니스 규칙은 이 레이어에서 구현되며, 데이터를 처리하고 컨트롤러로 결과를 반환합니다.
### Repository
- 데이터베이스와 상호작용하는 레이어를 담당합니다. 서비스 레이어가 비즈니스 로직을 처리하는 곳이라면, Repository는 실제 데이터의 읽기 및 쓰기 작업을 수행하며, 데이터베이스와 애플리케이션 간의 인터페이스 역할을 합니다.
### Validator
- 검증 로직을 구현하는 클래스입니다.
- 리소스가 유효한지, 중복인지, 속성이 유효한지 등을 체크하는 기능을 수행하며, 비즈니스 로직이나 예외 처리를 포함하지 않는 순수한 검증만 담당합니다.
### ValidatorExecutor
- Validator 클래스의 메소드를 사용하여 검증을 수행하고, 그 결과에 따라 비즈니스 로직에서 필요한 예외 처리 및 후속 작업을 관리합니다.
### ValidatorExecutorGroup
- 여러 개의 유효성 검증 로직을 모아서 관리하는 클래스 또는 모듈로 볼 수 있습니다. 일반적으로 검증 작업을 수행할 때 단일 책임 원칙을 유지하기 위해, 각 검증 로직을 분리하여 개별적으로 실행할 수 있지만, 이러한 개별 검증들을 묶어 한 번에 실행하고 관리할 수 있도록 하는 구조를 제공합니다.

## ENV
```dotenv
# Timezone
TZ=UTC

# DB
DATABASE_URL="postgresql://postgres:password@localhost:5432/db-name?schema=public"

# LIME SPACE
LIME_SPACE_BASE_URL=http://localhost/
LIME_SPACE_ACCESS_KEY=

# Server
DOMAIN_PRO=""
PORT=

# User Jwt
USER_ACCESS_TOKEN_EXPIRES_IN=
USER_ACCESS_TOKEN_SECRET_KEY=
USER_REFRESH_TOKEN_SECRET_KEY=
USER_REFRESH_TOKEN_EXPIRES_IN=

# Admin Jwt
ADMIN_ACCESS_TOKEN_EXPIRES_IN=
ADMIN_ACCESS_TOKEN_SECRET_KEY=
ADMIN_REFRESH_TOKEN_SECRET_KEY=
ADMIN_REFRESH_TOKEN_EXPIRES_IN=

# Password
PASSWORD_SECRET_KEY=
PASSWORD_SALT=

# Swagger
SWAGGER_ID=
SWAGGER_PW=

# AWS S3 FILE
AWS_S3_ACCESS_KEY=
AWS_S3_SECRET_KEY=
AWS_S3_BUCKET_NAME=
AWS_S3_REGION=
AWS_S3_BASEURL=

# AWS SNS
AWS_SNS_ACCESS_KEY=
AWS_SNS_SECRET_KEY=
AWS_SNS_REGION=

# AWS SES
AWS_SES_ACCESS_KEY=
AWS_SES_SECRET_KEY=
AWS_SES_REGION=
AWS_SES_EMAIL=

# GOOGLE OAUTH
GOOGLE_PROJECT_SERIAL=

# GOOGLE OAUTH WEB
GOOGLE_WEB_CLIENT_ID=
GOOGLE_WEB_CLIENT_SECRET=

# KAKAO OAUTH
KAKAO_APP_ID=

# KAKAO OAUTH WEB
KAKAO_WEB_CLIENT_ID=
KAKAO_WEB_CLIENT_SECRET=

# NAVER OAUTH WEB
NAVER_WEB_CLIENT_ID=
NAVER_WEB_CLIENT_SECRET=
```