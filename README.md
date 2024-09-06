# buchi_admin

backside working repo

/project-root
│
├── /config
│ ├── aws.js # AWS S3 관련 설정 파일
│ ├── database.js # Sequelize 및 DB 설정 파일
│ └── config.js # 기타 환경 설정 파일
│
├── /controllers
│ ├── fileController.js # 엑셀 파일 처리 관련 로직
│ ├── imageController.js # 이미지 URL 처리 관련 로직
│ └── index.js # 다른 컨트롤러들을 불러오는 모듈
│
├── /models
│ ├── index.js # Sequelize 초기화 및 모델들 불러오기
│ ├── File.js # 파일 관련 DB 모델
│ └── Image.js # 이미지 URL 관련 DB 모델
│
├── /routes
│ ├── fileRoutes.js # 파일 관련 API 라우트
│ ├── imageRoutes.js # 이미지 관련 API 라우트
│ └── index.js # 다른 라우트들을 불러오는 모듈
│
├── /services
│ ├── s3Service.js # AWS S3에서 파일을 다운로드하고 업로드하는 서비스 로직
│ ├── excelService.js # 엑셀 파일을 파싱하고 데이터를 가공하는 로직
│ └── dbService.js # 데이터베이스에 데이터를 저장하고 조회하는 로직
│
├── /utils
│ ├── excelParser.js # 엑셀 파싱 관련 유틸리티 함수들
│ ├── logger.js # 로깅 유틸리티
│ └── validation.js # 데이터 검증 유틸리티
│
├── /middlewares
│ ├── errorHandler.js # 에러 처리 미들웨어
│ └── authMiddleware.js # 인증 미들웨어 (필요 시)
│
├── /tests
│ ├── controllers.test.js # 컨트롤러 유닛 테스트
│ ├── services.test.js # 서비스 유닛 테스트
│ └── routes.test.js # 라우트 유닛 테스트
│
├── /public # 정적 파일 디렉토리 (필요 시)
│
├── /scripts # 배포 및 스크립트 파일 (필요 시)
│
├── .env # 환경 변수 설정 파일
├── .gitignore # Git에서 무시할 파일들
├── package.json # npm 패키지 및 스크립트 설정 파일
├── app.js # Express 애플리케이션 초기화 파일
└── server.js # 서버 실행 파일
