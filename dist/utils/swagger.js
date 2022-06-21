const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    version: '1.0.0',
    title: 'Nintendb',
    description: '닌텐도 스위치 커뮤니티',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Title',
      description: '게시글 생성, 조회, 수정, 삭제',
    },
    {
      name: 'Forum',
      description: '댓글 생성, 조회, 수정, 삭제',
    },
    {
      name: 'Private',
      description: '댓글 생성, 조회, 수정, 삭제',
    },
    {
      name: 'Users',
      description: '로그인, 회원가입, 내 정보 조회',
    },
    {
      name: 'Etc',
      description: '댓글 생성, 조회, 수정, 삭제',
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'X-API-KEY',
      description: 'any description...',
    },
  },
  definitions: {
    Users: {
      email: 'test@google.com',
      nickname: 'nickname',
      password: 'test1234',
      profileImg: 'url',
    },
    Posts: {
      postId: 1,
      $nickname: 'nickname',
      category: '초급',
      date: '2022-06-13',
      title: 'title test',
      content: 'content test',
    },
    Comments: {
      $postId: 1,
      commentId: 1,
      $nickname: 'nickname',
      comment: 'comment test',
      date: '2022-06-13',
    },
  },
}

const outputFile = './swagger-output.json'
const endpointsFiles = [
  './dist/routes/login.js',
  './dist/routes/forum.route.js',
  './dist/routes/title.route.js',
  './dist/routes/private.route.js',
  './dist/routes/etc.route.js',
]

swaggerAutogen(outputFile, endpointsFiles, doc)
