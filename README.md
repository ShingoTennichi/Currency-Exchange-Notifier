# Currency-Exchange-Notifier

Automated currency notification application for registered users
## Technologies
- Programming language: TypeScript(Backend), JavaScript(AWS Lambda)
- API: AWS SNS, APILayer(Exchange Rates Data API), Fetch API
- Framework: Next.js(Frontend), Tailwind CSS(CSS)
- Database: CockroachDB(NoSQL Database), Prisma(ORM)
### Platform
- Execute JavaScript code on <b>AWS Lambda</b> Function that autonomously publishes currency rate for registered users
- Used Next.js 13.4 to realize <a href="https://github.com/ShingoTennichi/backend-server/tree/main/src/app/api/currency-notifier">back-end systems</a> for manipulations of database
### Database
- Stored user data to cockroachDB as <b>NoSQL</b> structure
- Created user scheme and implement <b>CRUD operation</b> by using prisma ORM
### AWS Lambda
- Used async/await fetch api to retrieve user data and to collect currency rate
- the runtime environment: <b>Node.js 18.x</b>
### EventBridge
- Execute Lambda function every 6 hours
<img alt="AWS" src="https://github.com/ShingoTennichi/Currency-Exchange-Notifier/blob/main/Images/Lambda%20Function%20-%20Overview.png" width="400" />




