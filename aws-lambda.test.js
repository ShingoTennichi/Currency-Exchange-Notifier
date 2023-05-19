import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const ARN_CODE = {
  API_KEY_GROUP1: process.env.ARN_CODE_CAD_TO_JPY,
  API_KEY_GROUP2: process.env.ARN_CODE_CAD_TO_PHP,
}

class User {
  #_apiGroup;
  #_to;
  #_from;
  #_arnCode;
  constructor(apiGroup, to, from) {
    this._apiGroup = apiGroup;
    this._to = to;
    this._from = from;
    this._arnCode = ARN_CODE[`${this._apiGroup}`];
  }

  get apiKey() {
    return process.env[`${this._apiGroup}`];
  }

  get arnCode() {
    return this._arnCode;
  }

  get from() {
    return this._from;
  }

  get to() {
    return this._to;
  }

  get url() {
    return `https://api.apilayer.com/exchangerates_data/convert?to=${this._to}&from=${this._from}&amount=1`
  }
}

export const handler = async (event) => {

  const fetchUserResult = await fetch(process.env.FETCH_USERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify("POST")
  });

  const { data: userData } = await fetchUserResult.json();

  const users = [];
  for (const data of userData) {
    const user = new User(data.apiKeyGroup, data.to, data.from);
    users.push(user);
  }
  // console.log(users)
  for (const user of users) {
    console.log(user)
    //=================== API Layer ======================//
    const customHeaders = new Headers();
    customHeaders.append("apikey", user.apiKey);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: customHeaders
    };

    try {
      const fetchCurrencyResult = await fetch(user.url, requestOptions);
      const { info: currencyData } = await fetchCurrencyResult.json();
      console.log("Successfully fetched currency data");

      //======================= SNS ==========================//
      const client = new SNSClient({
        region: process.env.AWS_REGION
      });

      const params = {
        TopicArn: user.arnCode,
        Subject: "Currency Notifier v2",
        Message: `Now ${user.from}: $1 is ${user.to}: ¥${currencyData.rate}`
      };

      const command = new PublishCommand(params);
      const snsResult = await client.send(command);
      console.log("Published a message successfully");

    } catch (error) {

      throw new Error(error);

    }
  };
};

handler("test");