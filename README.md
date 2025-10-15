# **VerifyApp Backend**

Full-stack mobile verification application using **Node.js, Express, MongoDB (backend)** and **React (frontend)**, supporting phone number OTP verification via **Twilio**.

Supports **local development** and **AWS Lambda deployment**.

---

## **Prerequisites**

Before running the project locally or deploying:

- **Node.js v22+**
- **MongoDB installed and running**
- **Twilio account & credentials**:
  - `TWILIO_ACCOUNT_SID`
  - `TWILIO_AUTH_TOKEN`
  - `TWILIO_PHONE_NUMBER`  

> These must be set in `.env` or Lambda environment variables.

---

## **Environment Variables**

### **Backend**
Copy `.env.default` to `.env` for local development.


---

## **Local Development**

### **Backend**
1. Install dependencies:
```bash
cd verifyapp-backend
npm install
```
2. Run MongoDB locally.

3. Start backend server:

```bash
npm run start
```

### **Frontend**

1. Install dependencies:
```bash
cd verifyapp-frontend
npm install
```

2. Start React app:
```bash
npm run dev
```

Open in browser:
```bash
http://localhost:5173
```

---

## **AWS Lambda Deployment (Backend)**

Your backend can run on AWS Lambda with handler.js:

1. Install serverless-express wrapper:
```bash
npm install @vendia/serverless-express
```

2. Lambda entrypoint: handler.js

3. Create Lambda Function (Node.js 18.x), handler: handler.handler.

4. Add environment variables in Lambda console (same as .env.default).

5. Connect Lambda to API Gateway.

---

## **Notes**

1. Ensure Twilio credentials are valid before testing OTP.
2. Use server.js for local backend, handler.js for Lambda deployment.
3. MongoDB must be accessible from Lambda (use MongoDB Atlas if deploying in cloud).
