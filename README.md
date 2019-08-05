# Transaction Process

1. Checkout button
2. Trigger a post request to daraja with the relevant payload
3. Triggers an STK PUSH to the users phone to enter a password and complete the the transaction
4. Users account is debited, then you receive a webhook (to your servers; webhook url you passed) with details of the transaction.
