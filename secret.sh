#!/bin/bash
## パラメータ
PRIVATE_KEY_KEYPAIR_NAME="githubapp-private-key"
PRIVATE_KEY_VALUE_FILE_NAME="private-key.pem"
SECRET_STRINGS_NAME="githubapp-secret-strings"
SECRET_STRINGS_FILE_NAME="secrets.json"

###
## PRIVATE_KEY を作成する
## binary として保存する
###
aws secretsmanager create-secret \
   --name ${PRIVATE_KEY_KEYPAIR_NAME} \
   --secret-string file://${PRIVATE_KEY_VALUE_FILE_NAME} \
   --region us-east-1

###
## WEBHOOK_SECRET などを json としてまとめて保存する
###
aws secretsmanager create-secret \
   --name ${SECRET_STRINGS_NAME} \
   --secret-string file://${SECRET_STRINGS_FILE_NAME} \
   --region us-east-1