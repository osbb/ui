import Promise from 'bluebird';
import seneca from 'seneca';

const senecaUsersClient = seneca()
  .client({
    host: process.env.USERS_PORT_10101_TCP_ADDR || 'localhost',
    port: process.env.USERS_PORT_10101_TCP_PORT || 30004,
  });

const senecaCooperativesClient = seneca()
  .client({
    host: process.env.COOPERATIVES_PORT_10101_TCP_ADDR || 'localhost',
    port: process.env.COOPERATIVES_PORT_10101_TCP_PORT || 30006,
  });

export const actUsers = Promise.promisify(
  senecaUsersClient.act,
  { context: senecaUsersClient }
);

export const actCooperatives = Promise.promisify(
  senecaCooperativesClient.act,
  { context: senecaCooperativesClient }
);
