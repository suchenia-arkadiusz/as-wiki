'use strict';

let dbm;
let type;
let seed;
const fs = require('fs');
const path = require('path');
let Promise;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
require('dotenv').config();

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

exports.up = function (db) {
  return createUsersTableAndAdminUser(db).then(() => {
    const filePath = path.join(__dirname, 'sqls', '20231010190457-V1-Baseline-up.sql');
    return new Promise(function (resolve, reject) {
      fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (err) return reject(err);
        console.log(`received data: ${  data}`);

        resolve(data);
      });
    }).then(function (data) {
      return db.runSql(data);
    });
  });
};

exports.down = function (db) {
  const filePath = path.join(__dirname, 'sqls', '20231010190457-V1-Baseline-down.sql');
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
      if (err) return reject(err);
      console.log(`received data: ${  data}`);

      resolve(data);
    });
  }).then(function (data) {
    return db.runSql(data);
  });
};

exports._meta = {
  version: 1,
};

async function createUsersTableAndAdminUser(db) {
  bcrypt.hash(process.env.APP_ADMIN_USER_PASSWORD, 12).then((hashedPassword) => {
    const createUsersTableQuery = `CREATE TABLE "USERS" (
    "id" uuid PRIMARY KEY ,
    "username" VARCHAR(50) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "e_mail" VARCHAR(255) UNIQUE NOT NULL,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "created_at" TIMESTAMP NOT NULL,
    "avatar_url" TEXT,
    "permissions" VARCHAR(255)
);`;
    db.runSql(createUsersTableQuery);
    const createAdminUserQuery = `INSERT INTO "USERS" (
    "id",
    "username",
    "password",
    "e_mail",
    "first_name",
    "last_name",
    "created_at",
    "avatar_url",
    "permissions"
) VALUES (
    '${uuidv4()}',
    'admin','${hashedPassword}',
    '${process.env.APP_ADMIN_USER_EMAIL}',
    'Admin',
    null,
    '${new Date().toISOString()}',
    null,
    'admin'
);`;
    db.runSql(createAdminUserQuery);
    console.log('Admin user added');
  });
}
