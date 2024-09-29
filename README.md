# buchi_admin

![로고](./frontend/public/buchi_logo_full.png)

## 서비스 개요

"부장님의 취향" 서비스에서 운용하는 다양한 식당들의 정보를 처리하는 데이터 처리 프로젝트입니다.  
초기에는 역삼동 내의 식당들에 대한 서비스가 이루어지고, 추후 단계적으로 지역을 확장해나갈 예정입니다.

backside working repo

/project-root
│
├── /aws
│ └── s3.js
│
├── /config
│ ├── aws.js
│ └── config.js
│
├── /controllers
│ ├── dataGet.js
│ └── spotInfoGet.js
│
├── /models
│ ├── index.js
│ ├── company.js
│ ├── menu.js
│ ├── review.js
│ ├── sectionLabel.js
│ ├── spot.js
│ ├── tagLabel.js
│ ├── user.js
│ ├── userLocation.js
│ └── visit.js
│
├── /router
│ ├── dataRouter.js
│ └── dbRouter.js
│
├── /services
│ ├── dataProcessing.js
│ └── spotProcessing.js
│
├── /utils
│ ├── awsUtils.js
│ ├── dataUilts.js
│ └── dataConvert.js
│
├── .env
├── .gitignore
├── package.json
└── service.js
