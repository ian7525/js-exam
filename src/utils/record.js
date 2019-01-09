import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExportConfig from 'aws-exports';
import * as mutations from 'graphql/mutations';
import * as subscriptions from 'graphql/subscriptions';

Amplify.configure(awsExportConfig);

const createRecord = async ({ recordTestId, subjectId, roomId, ques }) => {
  const params = {
    input: {
      recordTestId,
      subjectId,
      syncCode: ques.content,
      timeBegin: new Date(),
      ques,
      recordRoomId: roomId,
    },
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createRecord, params),
  );
  return data.createRecord;
};

const updateRecord = async (id, newCode) => {
  const params = {
    input: {
      id,
      syncCode: newCode,
      timeEnd: new Date(),
    },
  };
  const result = await API.graphql(
    graphqlOperation(mutations.updateRecord, params),
  );
  return result;
};

const subscribeOnCreateRecord = callback => {
  return API.graphql(graphqlOperation(subscriptions.onCreateRecord)).subscribe({
    next: ({ value }) => {
      callback(value.data.onCreateRecord);
    },
    error: error => {
      console.error(error);
    },
  });
};

const subscribeOnUpdateRecordByRecordId = (id, callback) => {
  return API.graphql(
    graphqlOperation(subscriptions.onUpdateRecordByRecordId, { id }),
  ).subscribe({
    next: ({ value }) => {
      callback(value.data.onUpdateRecordByRecordId);
    },
    error: error => {
      console.error(error);
    },
  });
};

export {
  createRecord,
  updateRecord,
  subscribeOnCreateRecord,
  subscribeOnUpdateRecordByRecordId,
};
